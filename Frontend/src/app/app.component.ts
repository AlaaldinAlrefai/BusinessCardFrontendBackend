import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component'; // Adjust the path as needed
import { BusinessCardListComponent } from './business-card-list/business-card-list.component'; // Adjust the path as needed
import { BusinessCard } from './models/business-card.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule, // Include RouterModule for routing
    AddBusinessCardComponent, // Import the AddBusinessCardComponent
    BusinessCardListComponent // Import the BusinessCardListComponent
    
  ]
})
export class AppComponent {
  title = 'Business Card Manager';

  

  constructor(private toastr: ToastrService) {}

  showToast() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  /*applyFilter(filters: any) {
    this.filteredBusinessCards = this.businessCards.filter(card => {
      return (
        (filters.name ? card.name.includes(filters.name) : true) &&
        (filters.dob ? card.dateOfBirth === filters.dob : true) &&
        (filters.phone ? card.phone.includes(filters.phone) : true) &&
        (filters.gender ? card.gender === filters.gender : true) &&
        (filters.email ? card.email.includes(filters.email) : true)
      );
    });
  }*/

}
