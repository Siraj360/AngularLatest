import { Component, computed, EventEmitter, inject, OnInit, Output, Signal } from '@angular/core';
import { Contact, DataService } from '../data.service';

@Component({
  selector: 'sg-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {

  private dataService = inject(DataService);

  // 🔹 Users signal
  users: Signal<Contact[]> = this.dataService.users;

    // Derived reversed signal
  reversedUsers = computed(() => [...this.users()].reverse());

  // 🔹 Output to parent for edit action
  @Output() edit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  // 🔹 Helpers to get default contact info
  getDefaultEmail(user: Contact) {
    return user.emails.find((e) => e.isDefault)?.email || user.emails[0]?.email || 'N/A';
  }

  getDefaultPhone(user: Contact) {
    return user.phones.find((p) => p.isDefault)?.phone || user.phones[0]?.phone || 'N/A';
  }

  getDefaultAddress(user: Contact) {
    const address = user.addresses.find((a) => a.isDefault);
    return address ? `${address.street}, ${address.city}, ${address.zip}` : 'N/A';
  }

  // 🔹 Emit edit event to parent instead of navigating
  editUser(user: Contact) {
    this.edit.emit(user.id);
  }

  // 🔹 Delete user
  deleteUser(userId: string) {
    this.dataService.deleteContact(userId);
  }
}
