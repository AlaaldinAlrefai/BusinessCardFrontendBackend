import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component'; // Adjust the path as needed
import { BusinessCardListComponent } from './business-card-list/business-card-list.component'; // Adjust the path as needed

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
}
