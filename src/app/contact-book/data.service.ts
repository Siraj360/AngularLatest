
import { Injectable, signal, WritableSignal, computed, effect } from '@angular/core';

// --- INTERFACES ---
export interface Email {
  email: string;
  isDefault: boolean;
}

export interface Phone {
  phone: string;
  isDefault: boolean;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Contact {
  id: string;
  name: string;
  emails: Email[];
  phones: Phone[];
  addresses: Address[];
}

export interface Database {
  users: Contact[];
}

const STORAGE_KEY = 'angular_contact_db';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private databaseSignal: WritableSignal<Database>;
  public users = computed(() => this.databaseSignal().users);
  // This signal will hold the path to return to after an edit/add.
  // It defaults to the main table view.
  public returnUrl = signal<string>('/');

  constructor() {
    this.databaseSignal = signal(this.loadFromStorage());

    effect(() => {
      this.saveToStorage(this.databaseSignal());
      console.log('Database state changed and was saved to localStorage.');
    });
  }

  private loadFromStorage(): Database {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        console.log('SUCCESS: Loaded data from localStorage.');
        return JSON.parse(storedData);
      } catch (e) {
        console.error('ERROR: Failed to parse localStorage data, it may be corrupt. Removing it.', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    console.log('INFO: localStorage is empty. Seeding with initial data.');
    return this.getInitialData();
  }

  private saveToStorage(data: Database): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('FATAL: Could not save data to localStorage.', e);
    }
  }

  createContact(newUser: Omit<Contact, 'id'>): void {
    const userWithId: Contact = {
      ...newUser,
      id: new Date().getTime().toString(36) + Math.random().toString(36).slice(2),
    };
    this.databaseSignal.update(db => ({ ...db, users: [...db.users, userWithId] }));
  }

  updateContact(updatedUser: Contact): void {
    this.databaseSignal.update(db => ({
      ...db,
      users: db.users.map(u => (u.id === updatedUser.id ? updatedUser : u)),
    }));
  }

  deleteContact(id: string): void {
    this.databaseSignal.update(db => ({ ...db, users: db.users.filter(user => user.id !== id) }));
  }

  private getInitialData(): Database {
    return {
      users: [
        {
          id: 'lrtl1s8z39o5m3j2h9c',
          name: 'John Doe',
          emails: [{ email: 'john.d@example.com', isDefault: true }, { email: 'john.doe@work.com', isDefault: false }],
          phones: [{ phone: '+1-555-0101', isDefault: true }],
          addresses: [{ street: '123 Maple St', city: 'Springfield', zip: '12345', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9d',
          name: 'Jane Smith',
          emails: [{ email: 'jane.s@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0102', isDefault: true }, { phone: '+1-555-0103', isDefault: false }],
          addresses: [{ street: '456 Oak Ave', city: 'Shelbyville', zip: '23456', country: 'USA', isDefault: true }, { street: '789 Pine Ln', city: 'Shelbyville', zip: '23457', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9e',
          name: 'Alice Johnson',
          emails: [{ email: 'alice.j@example.com', isDefault: true }, { email: 'a.johnson@corp.com', isDefault: false }, { email: 'ali.j@vanity.com', isDefault: false }],
          phones: [{ phone: '+1-555-0104', isDefault: true }],
          addresses: [{ street: '101 Birch Rd', city: 'Capital City', zip: '34567', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9f',
          name: 'Bob Brown',
          emails: [{ email: 'bob.b@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0105', isDefault: true }],
          addresses: [{ street: '212 Cedar Blvd', city: 'North Haverbrook', zip: '45678', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9g',
          name: 'Charlie Davis',
          emails: [{ email: 'charlie.d@example.com', isDefault: true }, { email: 'c.davis@university.edu', isDefault: false }],
          phones: [{ phone: '+1-555-0106', isDefault: true }, { phone: '+1-555-0107', isDefault: false }, { phone: '+1-555-0108', isDefault: false }],
          addresses: [{ street: '333 Elm St', city: 'Ogdenville', zip: '56789', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9h',
          name: 'Diana Miller',
          emails: [{ email: 'diana.m@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0109', isDefault: true }],
          addresses: [{ street: '444 Spruce Way', city: 'Springfield', zip: '12346', country: 'USA', isDefault: true }, { street: '555 Willow Dr', city: 'Capital City', zip: '34568', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9i',
          name: 'Ethan Garcia',
          emails: [{ email: 'ethan.g@example.com', isDefault: true }, { email: 'egarcia@company.net', isDefault: false }],
          phones: [{ phone: '+1-555-0110', isDefault: true }],
          addresses: [{ street: '666 Aspen Ct', city: 'Shelbyville', zip: '23458', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9j',
          name: 'Fiona Rodriguez',
          emails: [{ email: 'fiona.r@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0111', isDefault: true }, { phone: '+1-555-0112', isDefault: false }],
          addresses: [{ street: '777 Redwood Pl', city: 'North Haverbrook', zip: '45679', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9k',
          name: 'George Martinez',
          emails: [{ email: 'george.m@example.com', isDefault: true }, { email: 'gmartinez@work.org', isDefault: false }, { email: 'georgie@coolmail.com', isDefault: false }],
          phones: [{ phone: '+1-555-0113', isDefault: true }],
          addresses: [{ street: '888 Sequoia Ave', city: 'Ogdenville', zip: '56790', country: 'USA', isDefault: true }, { street: '999 Lombard St', city: 'Capital City', zip: '34569', country: 'USA', isDefault: false }, { street: '100 Rosewood Xing', city: 'Capital City', zip: '34570', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9l',
          name: 'Hannah Wilson',
          emails: [{ email: 'hannah.w@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0114', isDefault: true }],
          addresses: [{ street: '111 Pinecone Blvd', city: 'Springfield', zip: '12347', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9m',
          name: 'Ian Taylor',
          emails: [{ email: 'ian.t@example.com', isDefault: true }, { email: 'i.taylor@business.biz', isDefault: false }],
          phones: [{ phone: '+1-555-0115', isDefault: true }, { phone: '+1-555-0116', isDefault: false }],
          addresses: [{ street: '222 Chestnut Dr', city: 'Shelbyville', zip: '23459', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9n',
          name: 'Jasmine Anderson',
          emails: [{ email: 'jasmine.a@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0117', isDefault: true }],
          addresses: [{ street: '333 Walnut St', city: 'Capital City', zip: '34571', country: 'USA', isDefault: true }, { street: '444 Cherry Ln', city: 'Capital City', zip: '34572', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9o',
          name: 'Kevin Thomas',
          emails: [{ email: 'kevin.t@example.com', isDefault: true }, { email: 'k.thomas@job.com', isDefault: false }],
          phones: [{ phone: '+1-555-0118', isDefault: true }],
          addresses: [{ street: '555 Peach Ave', city: 'North Haverbrook', zip: '45680', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9p',
          name: 'Laura Hernandez',
          emails: [{ email: 'laura.h@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0119', isDefault: true }, { phone: '+1-555-0120', isDefault: false }, { phone: '+1-555-0121', isDefault: false }],
          addresses: [{ street: '666 Plum Way', city: 'Ogdenville', zip: '56791', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9q',
          name: 'Mike Moore',
          emails: [{ email: 'mike.m@example.com', isDefault: true }, { email: 'm.moore@startup.io', isDefault: false }],
          phones: [{ phone: '+1-555-0122', isDefault: true }],
          addresses: [{ street: '777 Orange Rd', city: 'Springfield', zip: '12348', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9r',
          name: 'Nina Martin',
          emails: [{ email: 'nina.m@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0123', isDefault: true }],
          addresses: [{ street: '888 Lemon Ct', city: 'Shelbyville', zip: '23460', country: 'USA', isDefault: true }, { street: '999 Lime Pl', city: 'Shelbyville', zip: '23461', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9s',
          name: 'Oscar Jackson',
          emails: [{ email: 'oscar.j@example.com', isDefault: true }, { email: 'o.jackson@gov.org', isDefault: false }, { email: 'ozzy@webmail.com', isDefault: false }],
          phones: [{ phone: '+1-555-0124', isDefault: true }, { phone: '+1-555-0125', isDefault: false }],
          addresses: [{ street: '1010 Grape St', city: 'Capital City', zip: '34573', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9t',
          name: 'Penny Lee',
          emails: [{ email: 'penny.l@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0126', isDefault: true }],
          addresses: [{ street: '1212 Banana Blvd', city: 'North Haverbrook', zip: '45681', country: 'USA', isDefault: true }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9u',
          name: 'Quincy Perez',
          emails: [{ email: 'quincy.p@example.com', isDefault: true }, { email: 'q.perez@research.net', isDefault: false }],
          phones: [{ phone: '+1-555-0127', isDefault: true }],
          addresses: [{ street: '1313 Coconut Ln', city: 'Ogdenville', zip: '56792', country: 'USA', isDefault: true }, { street: '1414 Papaya Dr', city: 'Ogdenville', zip: '56793', country: 'USA', isDefault: false }, { street: '1515 Mango Ter', city: 'Ogdenville', zip: '56794', country: 'USA', isDefault: false }]
        },
        {
          id: 'lrt_l1s8z39o5m3j2h9v',
          name: 'Rachel White',
          emails: [{ email: 'rachel.w@example.com', isDefault: true }],
          phones: [{ phone: '+1-555-0128', isDefault: true }, { phone: '+1-555-0129', isDefault: false }],
          addresses: [{ street: '1616 Avocado Ave', city: 'Springfield', zip: '12349', country: 'USA', isDefault: true }]
        }
      ],
    };
  }
}
