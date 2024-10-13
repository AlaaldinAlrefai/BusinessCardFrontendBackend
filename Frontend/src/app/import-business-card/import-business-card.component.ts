
import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsQR } from 'jsqr';
import { BusinessCardService } from '../services/business-card.service';
import { BusinessCardPreviewComponent } from "../business-card-preview/business-card-preview.component";

@Component({
  selector: 'app-import-business-card',
  standalone: true,
  templateUrl: './import-business-card.component.html',
  styleUrls: ['./import-business-card.component.css'],
  imports: [BusinessCardPreviewComponent]
})
export class ImportBusinessCardComponent {
  files: File[] = [];
  businessCardPreview: any = null; // For storing the imported business card data

  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to the file input

  constructor(private businessCardService: BusinessCardService) {}

  // Trigger the file input click
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
onFileChange(event: any) {
  this.files = Array.from(event.target.files); // Convert FileList to array
  console.log('Files selected:', this.files);
}

  // Handle file drop
onDrop(event: DragEvent) {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop propagation to parent elements
  this.files = Array.from(event.dataTransfer?.files || []); // Get dropped files
  console.log('Files dropped:', this.files);
}


  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior to allow drop
    event.stopPropagation(); // Stop propagation to parent elements
  }

 

  // Import files
importFiles() {
  this.files.forEach(file => {
    if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
      this.businessCardService.importXML(file).subscribe(
        response => {
          console.log('Imported XML response:', response);
          this.businessCardPreview = response; // Set the imported data for preview
        },
        error => {
          console.error('Error importing XML:', error);
        }
      );
    } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      this.businessCardService.importCSV(file).subscribe(
        response => {
          console.log('Imported CSV response:', response);
          this.businessCardPreview = response; // Set the imported data for preview
        },
        error => {
          console.error('Error importing CSV:', error);
        }
      );
    } else {
      console.warn('Unsupported file type:', file.type);
    }
  });
}






// Method to get the file icon based on the file type
getFileIcon(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'xml':
      return 'assets/icons/xml-icon.png'; // Path to your XML icon
    case 'csv':
      return 'assets/icons/csv-icon.png'; // Path to your CSV icon
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'assets/icons/image-icon.png'; // Path to your image icon
    default:
      return 'assets/icons/default-icon.png'; // Default icon for unsupported file types
  }
}
  

  // Read the XML file as text
  readXMLFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const xmlContent = event.target.result; // Get the XML content as a string
      console.log('XML file content:', xmlContent); // Log XML content before sending
  
      this.businessCardService.importXML(xmlContent).subscribe(
        (response) => {
          console.log('Imported XML response:', response);
          this.businessCardPreview = response; // Set the imported data for preview
        },
        (error) => {
          console.error('Error importing XML:', error);
        }
      );
    };
    reader.readAsText(file); // Read the file as text
  }


}