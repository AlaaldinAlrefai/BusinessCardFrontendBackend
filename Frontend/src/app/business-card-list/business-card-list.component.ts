import { Component } from '@angular/core';
import { BusinessCardService } from '../services/business-card.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterComponent } from '../filter-options/filter-options.component'; // Import FilterComponent
import { FormsModule } from '@angular/forms';
import { ExportBusinessCardComponent } from "../export-business-card/export-business-card.component";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBusinessCardComponent } from '../update-business-card/update-business-card.component';
import { businessCard, BusinessCard } from '../models/business-card.model';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-business-card-list',
  standalone: true,
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css'],
  imports: [CommonModule, FilterComponent, FormsModule, 
    ExportBusinessCardComponent,UpdateBusinessCardComponent,NgxPaginationModule], // Include FilterComponent here
  providers: [DatePipe]
 // Include FilterComponent here
})
export class BusinessCardListComponent {

  filters: any = {}; // Object to hold filters
  businessCards: businessCard[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  pageSizes = [5, 10, 20, 50];
  
  
  constructor(private businessCardService: BusinessCardService,private toastr:ToastrService,public dialog: MatDialog 
    ,private router: Router
  ) {
    this.loadBusinessCards(); // Load business cards in the constructor
  }



  // Method to navigate to another page
  navigateToAddBusinessCard() {
    this.router.navigate(['/add']); // Redirect to the 'add' route
  }


  updateItemsPerPage(event: any) {
    this.itemsPerPage = event.target.value; // Update items per page
    this.currentPage = 1; // Reset to first page after changing page size
  }


  loadBusinessCards() {
    this.businessCardService.getBusinessCards().subscribe(cards => {
      this.businessCards = cards;
      console.log(this.businessCards); // Log the loaded business cards
    });
  }
  


  formatDate(date?: Date | null): string | null {
    if (!date) return null; // Return null if the date is not provided
  
    const d = new Date(date); // Create a new Date object
    const month = d.getMonth() + 1; // Adjust the month (add 1 because months are zero-indexed)
    const day = d.getDate();
    const year = d.getFullYear();
  
    // Format the date as MM/dd/yyyy
    return `${month}/${day}/${year}`;
  }
  
  
  

  deleteCard(id: number) {
    if (confirm('Are you sure you want to delete this business card?')) {
    this.businessCardService.deleteBusinessCard(id).subscribe(() => {
      // Remove the deleted card from the list
      this.businessCards = this.businessCards.filter(card => card.id !== id);
      this.toastr.success('Business card deleted successfully!', 'Delete Confirmation');
    }
    );
  }
  }
  

  exportCard(card: any) {
    // Implement export functionality here
  }

  applyFilters(filters: any) {
    this.currentPage = 1
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
  
  


  openUpdateDialog(card: BusinessCard) {
    const dialogRef = this.dialog.open(UpdateBusinessCardComponent, {
      width: '900px',
      height:'500px',
      data: card,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          const index = this.businessCards.findIndex(c => c.id === result.id);
          if (index !== -1) {
              this.businessCards[index] = result; // Update the card in the list with the updated data

          }
          this.toastr.success('Business card updated successfully!', 'Update Confirmation');
      }
    });
    
  }



  
  
}
