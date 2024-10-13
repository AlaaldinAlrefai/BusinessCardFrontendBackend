import { Component, Input } from '@angular/core';
import { BusinessCard } from '../models/business-card.model';

@Component({
  selector: 'app-business-card-preview',
  templateUrl: './business-card-preview.component.html',
  styleUrls: ['./business-card-preview.component.css'],
  standalone:true
})
export class BusinessCardPreviewComponent {
  @Input() businessCard!: BusinessCard; // Bind business card data
}
