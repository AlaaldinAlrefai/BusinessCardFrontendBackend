import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BusinessCardService } from '../services/business-card.service';
import { BusinessCard } from '../models/business-card.model';
import { ImportBusinessCardComponent } from "../import-business-card/import-business-card.component";

@Component({
  selector: 'app-add-business-card',
  standalone: true,
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css'],
  imports: [FormsModule, ImportBusinessCardComponent]
})
export class AddBusinessCardComponent {
  newCard: BusinessCard = { 
    id: 0, 
    name: '', 
    gender: '', 
    dateOfBirth: null, 
    email: '', 
    phone: '', 
    address: '', 
    notes: '', 
    photo: '', 
    qrCode: '' ,
    userId: 2
  };

  

  constructor(private businessCardService: BusinessCardService) {}

  onSubmit() {
    this.businessCardService.addBusinessCard(this.newCard).subscribe(
      (response) => {
        console.log('Business card added successfully:', response);
        // Reset form or show success message
      },
      (error) => {
        console.error('Error adding business card:', error);
      }
    );
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
