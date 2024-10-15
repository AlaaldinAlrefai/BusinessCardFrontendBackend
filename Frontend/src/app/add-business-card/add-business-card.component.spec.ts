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
  imports: [FormsModule, ImportBusinessCardComponent, CommonModule]
})
export class AddBusinessCardComponent {
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;

  newCard: BusinessCard = {
    id: 0,
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

  constructor(private businessCardService: BusinessCardService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.businessCardService.addBusinessCard(this.newCard).subscribe(
      (response) => {
        console.log('Business card added successfully:', response);
        if (this.newCard.dateOfBirth) {
          this.newCard.dateOfBirth = new Date(this.newCard.dateOfBirth);
        }
        this.clearForm(form);
      },
      (error) => {
        console.error('Error adding business card:', error);
      }
    );
  }

  clearForm(form: NgForm) {
    this.newCard = {
      id: 0,
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

    form.resetForm();
    this.photoInput.nativeElement.value = '';
  }

  navigateToBusinessCardList() {
    this.router.navigate(['/list']);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newCard.photo = reader.result as string; // Use the complete data URL
      };
      reader.readAsDataURL(file);
    } else {
      this.newCard.photo = ''; // Clear the photo if no file is selected
    }
  }
}
