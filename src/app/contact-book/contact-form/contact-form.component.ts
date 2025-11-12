import { Component, Input, Output, EventEmitter, computed, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Contact, Email, Phone, Address } from '../data.service';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'sg-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactFormComponent implements OnInit {

  private dataService = inject(DataService);
  private fb = inject(FormBuilder);

  // 🔹 Input: edit mode identifier
  @Input() editId: string | null = null;

  // 🔹 Output: notify parent when save/cancel is done
  @Output() updateDone = new EventEmitter<void>();

  // 🔹 Computed property for edit mode
  public isEditMode = computed(() => !!this.editId);

  // 🔹 Get user to edit
  private userToEdit = computed(() => {
    const userId = this.editId;
    const users = this.dataService.users();
    if (!userId || users.length === 0) return undefined;
    return users.find(u => u.id === userId);
  });

  // 🔹 Form
  public contactForm = this.fb.group({
    name: ['', Validators.required],
    emails: this.fb.array([]),
    phones: this.fb.array([]),
    addresses: this.fb.array([]),
  });

  constructor() {
    effect(() => {
      const user = this.userToEdit();
      if (this.isEditMode()) {
        if (user) this.populateForm(user);
      } else {
        this.populateForm();
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {}

  get emails() { return this.contactForm.get('emails') as FormArray; }
  get phones() { return this.contactForm.get('phones') as FormArray; }
  get addresses() { return this.contactForm.get('addresses') as FormArray; }

  private populateForm(user?: Contact) {
    this.contactForm.reset();
    this.emails.clear();
    this.phones.clear();
    this.addresses.clear();

    if (user) {
      this.contactForm.patchValue({ name: user.name });
      user.emails.forEach(email => this.addEmail(email));
      user.phones.forEach(phone => this.addPhone(phone));
      user.addresses.forEach(address => this.addAddress(address));
    } else {
      this.addEmail();
      this.addPhone();
      this.addAddress();
    }
  }

  addEmail(email?: Email) {
    this.emails.push(this.fb.group({
      email: [email?.email || '', [Validators.required, Validators.email]],
      isDefault: [email?.isDefault ?? this.emails.length === 0]
    }));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
    this.ensureDefault(this.emails);
  }

  addPhone(phone?: Phone) {
    this.phones.push(this.fb.group({
      phone: [phone?.phone || '', Validators.required],
      isDefault: [phone?.isDefault ?? this.phones.length === 0]
    }));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
    this.ensureDefault(this.phones);
  }

  addAddress(address?: Address) {
    this.addresses.push(this.fb.group({
      street: [address?.street || '', Validators.required],
      city: [address?.city || '', Validators.required],
      zip: [address?.zip || '', Validators.required],
      country: [address?.country || ''],
      isDefault: [address?.isDefault ?? this.addresses.length === 0]
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
    this.ensureDefault(this.addresses);
  }

  // 🔹 Ensure exactly one default in a FormArray
  private ensureDefault(array: FormArray) {
    if (array.length === 0) return;
    const hasDefault = array.value.some((x: any) => x.isDefault);
    if (!hasDefault) {
      array.at(0).get('isDefault')?.setValue(true);
    } else {
      let found = false;
      array.controls.forEach(ctrl => {
        const isDef = ctrl.get('isDefault')?.value;
        if (isDef && !found) found = true;
        else ctrl.get('isDefault')?.setValue(false);
      });
    }
  }

  // 🔹 Ensure defaults before save
  private ensureAllDefaults(formValue: Omit<Contact, 'id'>) {
    ['emails', 'phones', 'addresses'].forEach(section => {
      const list = (formValue as any)[section];
      if (list && list.length > 0) {
        const hasDefault = list.some((x: any) => x.isDefault);
        if (!hasDefault) list[0].isDefault = true;
        else {
          let found = false;
          list.forEach((x: any) => {
            if (x.isDefault && !found) found = true;
            else x.isDefault = false;
          });
        }
      }
    });
  }

  save() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    const formValue = this.contactForm.getRawValue() as Omit<Contact, 'id'>;
    this.ensureAllDefaults(formValue);

    if (this.isEditMode()) {
      const userId = this.editId!;
      const updatedUser: Contact = { ...formValue, id: userId };
      this.dataService.updateContact(updatedUser);
    } else {
      this.dataService.createContact(formValue);
    }

    this.updateDone.emit();
  }

  cancel() {
    this.updateDone.emit();
  }
}
