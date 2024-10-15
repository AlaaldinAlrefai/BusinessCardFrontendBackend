import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BusinessCardService } from '../services/business-card.service';
import { FormBuilder,Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { businessCard, BusinessCard } from '../models/business-card.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-business-card',
  standalone: true,
  imports: [    
    ReactiveFormsModule, // Ensure this is imported
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './update-business-card.component.html',
  styleUrl: './update-business-card.component.css',
  providers: [DatePipe]
})
export class UpdateBusinessCardComponent {

  businessCardForm: FormGroup;
  successMessage: string = '';
  isModalClosing: boolean = false;  // Declare isModalClosing here

  constructor(
    private fb: FormBuilder,
    private businessCardService: BusinessCardService,
    private dialogRef: MatDialogRef<UpdateBusinessCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessCard,
    private datePipe: DatePipe // Inject DatePipe here
  ) {
    this.businessCardForm = this.fb.group({
      name: [data.name, Validators.required],
      gender: [this.capitalizeFirstLetter(data.gender), Validators.required], // Ensure gender is set
      dateOfBirth:[this.formatDate(data.dateOfBirth)],
     // dateOfBirth: this.datePipe.transform(this.data.dateOfBirth, 'MM/dd/yy'), // Format the date
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      address: [data.address],
      notes: [data.notes],
      photo: [data.photo]
    });
  }


  ngOnInit() {
    // Format the date for display
    //const formattedDate = this.data.dateOfBirth ? this.datePipe.transform(this.data.dateOfBirth, 'MM/dd/yyyy') : null;
  
    // Set the initial values of the form from the data
    this.businessCardForm.patchValue({
      name: this.data.name,
      gender: this.data.gender,
      dateOfBirth: this.formatDate(this.data.dateOfBirth),
      email: this.data.email,
      phone: this.data.phone,
      address: this.data.address,
      notes: this.data.notes,
      photo: this.data.photo // Assuming the photo is in Base64 format
    });
    console.log(this.data.gender);  // Log the gender value to debug

  }
  

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }


  formatDate(dateString: Date | string | null | undefined): string | null {
    if (!dateString) {
      return null;
    }

    let date = new Date(dateString);

    // Subtract 1 month
    date.setMonth(date.getMonth() + 1);

    // Adjust for edge cases where subtracting a month could result in an invalid date
    const newMonth = date.getMonth();
    if (newMonth === 11 && date.getDate() === 31) {
      // Edge case fix for months with fewer days
      date.setDate(30);
    }

    // Format the date as 'yyyy-MM-dd'
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  onSave() {
    if (this.businessCardForm.valid) {
      const updatedCard: BusinessCard = {
        id: this.data.id,
        ...this.businessCardForm.value
      };

      // Prevent closing until the delay is done
    this.isModalClosing = false;

      // Call the service method to update the business card
      this.businessCardService.updateBusinessCard(updatedCard.id, updatedCard).subscribe(
        response => {
          this.dialogRef.close(updatedCard); // Close the dialog and pass the updated card
          this.successMessage = 'Business card updated successfully!';

          // Delay closing the modal for 60 seconds to display the success message
        setTimeout(() => {
          this.successMessage = ''; // Clear success message
          this.dialogRef.close(updatedCard); // Close the modal after 60 seconds
        }, 60000); // 60-second delay
        },
        error => {
          console.error('Error updating business card:', error);
          alert('Failed to update business card: ' + error.message);
        }
      );
    }
  }


  


  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.businessCardForm.patchValue({
          photo: (e.target?.result as string).split(',')[1] // Get Base64 string without header
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close the dialog without saving changes
  }






}
