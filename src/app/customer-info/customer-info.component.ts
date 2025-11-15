import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoCardComponent } from './customer-info-card/customer-info-card.component';
import { CustomerInfo } from './customer-info.model';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, CustomerInfoCardComponent],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoComponent {

  customersResource = this.createCustomerInfoResource();

  trackByEmail(index: number, customer: CustomerInfo) {
    return customer.email;
  }

createCustomerInfoResource() {
  return httpResource<CustomerInfo[]>(
    () => ({
      url: 'https://randomuser.me/api/?nat=us&results=150',
      method: 'GET',
    }),
    {
      defaultValue: [],
      parse: (response: any) =>
        response.results.map((ci: any) => ({
          id: ci.login.uuid,
          gender: ci.gender,
          title: ci.name.title,
          first: ci.name.first,
          last: ci.name.last,
          email: ci.email,
          phone: ci.phone,
          cell: ci.cell,
          login: ci.login.username,
          password: ci.login.password,
          address1: `${ci.location.street.number} ${ci.location.street.name}`,
          address2: `${ci.location.city}, ${ci.location.state} ${ci.location.postcode}`,
          state: ci.location.state,
          country: ci.location.country,
          dob: ci.dob.date,
          age: ci.dob.age,
          since: ci.registered.date,
          registered: ci.registered.date,
          picture: ci.picture.large,
          thumbnail: ci.picture.thumbnail,
          uuid: ci.login.uuid,
        })),
    }

 );
}
}
