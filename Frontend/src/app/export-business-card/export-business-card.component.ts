import { Component } from '@angular/core';
import { BusinessCardService } from '../services/business-card.service';

@Component({
  selector: 'app-export-business-card',
  standalone: true,
  imports: [],
  templateUrl: './export-business-card.component.html',
  styleUrl: './export-business-card.component.css'
})
export class ExportBusinessCardComponent {

  constructor(private businessCardService: BusinessCardService) {}


  exportBusinessCardsToCSV() {
    this.businessCardService.exportToCSV().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'business-cards.csv'; // Specify the filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up
    });
  }

  exportBusinessCardsToXML() {
    this.businessCardService.exportToXML().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'business-cards.xml'; // Specify the filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up
    });
  }

}
