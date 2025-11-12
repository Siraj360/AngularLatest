import { Component, OnInit } from '@angular/core';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'sg-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css'],
  imports: [ContactCardComponent, ContactTableComponent, ContactFormComponent, NgClass, CommonModule]
})
export class ContactBookComponent implements OnInit {

  constructor() { }

  public isListTable: boolean = true;       // table vs card view
  public showContactForm: boolean = false;  // show/hide form
  public editId: string | null = null;      // edit mode id

  ngOnInit() { }

  // Add new contact
  addNewContact() {
    this.editId = null;
    this.showContactForm = true;
  }

  // Edit existing contact
  editContact(id: string) {
    this.editId = id;
    this.showContactForm = true;
  }

  // Hide form when done
  onUpdateDone() {
    this.showContactForm = false;
    this.editId = null;
  }
}

