import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BusinessCardService } from '../services/business-card.service';
import { BusinessCard } from '../models/business-card.model';

@Component({
  selector: 'app-add-business-card',
  standalone: true,
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css'],
  imports: [FormsModule]
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
    qrCode: '' 
  };

  constructor(private businessCardService: BusinessCardService) {}

  onSubmit() {
    this.businessCardService.addBusinessCard(this.newCard);
    // Reset the form or handle post-submission logic
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle file parsing or photo upload logic here
      this.newCard.photo = file.name; // or handle it as needed
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
