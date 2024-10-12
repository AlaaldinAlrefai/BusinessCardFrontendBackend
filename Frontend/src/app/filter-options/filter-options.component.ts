import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  template: `
    <label>
      Search:
      <input type="text" (input)="onFilterChanged($event)">
    </label>
  `
})
export class FilterOptionsComponent {
  @Output() filterChanged = new EventEmitter<string>();

  onFilterChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    if (inputElement) { // Check if inputElement is not null
      this.filterChanged.emit(inputElement.value); // Emit the value
    }
  }
}
