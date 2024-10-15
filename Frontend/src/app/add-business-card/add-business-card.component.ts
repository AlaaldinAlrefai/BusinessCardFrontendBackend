import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { BusinessCardService } from '../services/business-card.service';
import { BusinessCard } from '../models/business-card.model';
import { ImportBusinessCardComponent } from "../import-business-card/import-business-card.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-business-card',
  standalone: true,
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css'],
  imports: [FormsModule, ImportBusinessCardComponent,CommonModule]
})
export class AddBusinessCardComponent {
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>; // Reference to the file input element


  newCard: BusinessCard = {
    id: 0, // You can initialize this as undefined for new cards
    userId: 2,
    name: '',
    gender: '',
    dateOfBirth: null,
    email: '',
    phone: '',
    address: '',
    notes: '',
    photo: ''
  };

  

  constructor(private businessCardService: BusinessCardService,private router: Router) {}



  


  onSubmit(form: NgForm) {
    // Convert gender to lowercase before submitting
    if (this.newCard.gender) {
      this.newCard.gender = this.newCard.gender.toLowerCase(); // Convert gender to lowercase
    }
  
    // Convert dateOfBirth to a Date object if it exists
    if (this.newCard.dateOfBirth) {
      this.newCard.dateOfBirth = new Date(this.newCard.dateOfBirth);
    }
  
    // Call the service to add the new business card
    this.businessCardService.addBusinessCard(this.newCard).subscribe(
      (response) => {
        console.log('Business card added successfully:', response);
  
        // After successful submission, clear the form
        this.clearForm(form);
      },
      (error) => {
        console.error('Error adding business card:', error);
      }
    );
  }
  
  


  clearForm(form: NgForm) {
    this.newCard = {
      id: 0, // Maintain the correct type
      userId: 2, // Maintain user ID for future entries
      name: '',
      gender: '',
      dateOfBirth: null,
      email: '',
      phone: '',
      address: '',
      notes: '',
      photo: ''
    };

    form.resetForm(); // This will reset the form state
    this.photoInput.nativeElement.value = ''; // Clear the file input
  }


  
  // Method to navigate to another page
  navigateToBusinessCardList() {
    this.router.navigate(['/list']); // Redirect to the 'add' route
  }



  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            // Get the full Base64 string (including prefix)
            const base64WithPrefix = reader.result as string;

            // Extract the Base64 data by removing the prefix
            const base64Data = base64WithPrefix.replace(/^data:image\/\w+;base64,/, '');

            // Assign the raw Base64 string (without prefix) to the photo field
            this.newCard.photo = base64Data;

            // Optionally, you could log the base64Data to see the raw data
            console.log(base64Data);
        };
        // Convert the file to Base64
        reader.readAsDataURL(file);
        // Clear the input value after reading the file
     // this.photoInput.nativeElement.value = '';
    } else {
        // Clear the photo if no file is selected
        this.newCard.photo = '';
    }
}












  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default to allow drop
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Handle the dropped file
      this.onFileChange({ target: { files } });
    }
  }
}
