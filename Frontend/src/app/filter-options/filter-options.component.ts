import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ], // Import FormsModule here
})
export class FilterComponent {
  name: string = '';
  dateOfBirth: string = '';
  phone: string = '';
  gender: string = '';
  email: string = '';

  @Output() filterChange = new EventEmitter<any>();

  applyFilters() {
    const filters = {
      name: this.name,
      dob: this.dateOfBirth,
      phone: this.phone,
      gender: this.gender,
      email: this.email
    };
    this.filterChange.emit(filters); // Emit the filters
  }

  resetForm() {
    this.name = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.gender = '';
    this.email = '';
  }


}
