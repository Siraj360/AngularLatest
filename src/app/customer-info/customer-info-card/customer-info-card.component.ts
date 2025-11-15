import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomerInfo } from '../customer-info.model';
import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-customer-info-card',
  templateUrl: './customer-info-card.component.html',
  styleUrls: ['./customer-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DatePipe, TitleCasePipe]
})
export class CustomerInfoCardComponent {
  customer = input.required<CustomerInfo>();
}
