import { Component } from '@angular/core';
import { BusinessCardService } from '../services/business-card.service';
import { FilterOptionsComponent } from '../filter-options/filter-options.component'; // Import here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-card-list',
  standalone: true,
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css'],
  imports: [CommonModule, FilterOptionsComponent] // Add here
})
export class BusinessCardListComponent {
  businessCards: any[] = []; // Initialize as an empty array

  constructor(private businessCardService: BusinessCardService) {
    this.loadBusinessCards(); // Load business cards in the constructor
  }

  loadBusinessCards() {
    this.businessCardService.getBusinessCards().subscribe(cards => {
      this.businessCards = cards; // Set the business cards
    });
  }

  deleteCard(id: number) {
    this.businessCardService.deleteBusinessCard(id).subscribe(() => {
      // Remove the deleted card from the list
      this.businessCards = this.businessCards.filter(card => card.id !== id);
    });
  }

  exportCard(card: any) {
    // Implement export functionality here
  }

  applyFilter(filter: string) {
    // Implement filtering logic here
  }
}
