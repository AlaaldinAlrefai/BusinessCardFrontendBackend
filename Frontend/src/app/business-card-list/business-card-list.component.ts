import { Component } from '@angular/core';
import { BusinessCardService } from '../services/business-card.service';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter-options/filter-options.component'; // Import FilterComponent
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-business-card-list',
  standalone: true,
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css'],
  imports: [CommonModule, FilterComponent,FormsModule] // Include FilterComponent here
})
export class BusinessCardListComponent {
  businessCards: any[] = []; // Initialize as an empty array
  filters: any = {}; // Object to hold filters

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

  applyFilters(filters: any) {
    const validFilters: Record<string, any> = {}; // استخدم Record<string, any>
    for (const key in filters) {
      if (filters[key]) {
        validFilters[key] = filters[key];
      }
    }
  
    console.log('Valid filters applied:', validFilters); // Log filters for debugging
  
    this.businessCardService.filterBusinessCards(validFilters).subscribe(
      (filteredCards) => {
        console.log('Filtered cards:', filteredCards); // Log the filtered cards for debugging
        this.businessCards = filteredCards; // Update the businessCards array
      },
      (error) => {
        console.error('Error retrieving filtered cards:', error); // Log errors
      }
    );
  }
  
  
  
  
}
