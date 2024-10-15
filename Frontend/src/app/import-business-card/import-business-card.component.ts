import { Component, ViewChild, ElementRef } from '@angular/core'; 
import { BusinessCardService } from '../services/business-card.service';
import { BusinessCardPreviewComponent } from "../business-card-preview/business-card-preview.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-business-card',
  standalone: true,
  templateUrl: './import-business-card.component.html',
  styleUrls: ['./import-business-card.component.css'],
  imports: [BusinessCardPreviewComponent, CommonModule]
})
export class ImportBusinessCardComponent {
  files: File[] = [];
  businessCardPreview: any = null; // For storing the imported business card data
  previewData: string[][] = []; // For CSV preview
  xmlPreviewString: string | null = null; // Stringified XML preview (Ensure this is used everywhere)
  isCardSaved: boolean = false; // Add this property to track the card's saved state


  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to the file input
  xmlPreviewRef: any;

  constructor(private businessCardService: BusinessCardService, private toastr: ToastrService) {}

  // Trigger the file input click
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
  onFileChange(event: any) {
    this.files = Array.from(event.target.files); // Convert FileList to array
    console.log('Files selected:', this.files);
    this.isCardSaved = false; // Reset isCardSaved when new files are selected
    this.importFiles(); // Call importFiles() to preview the content
  }

  // Handle file drop
  onDrop(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop propagation to parent elements
    this.files = Array.from(event.dataTransfer?.files || []); // Get dropped files
    console.log('Files dropped:', this.files);
    this.importFiles(); // Preview dropped files
  }

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior to allow drop
    event.stopPropagation(); // Stop propagation to parent elements
  }

  // Import files and parse for preview
  importFiles() {
    if (this.files.length === 0) {
      console.warn('No files selected for import.');
      return; // Early return if no files are selected
    }

    this.files.forEach(file => {
      if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
        this.previewData = []; // Clear CSV preview when processing XML
        this.readXMLFile(file); // Read and preview XML
      } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        this.xmlPreviewString = null; // Clear XML preview when processing CSV
        this.readCSVFile(file); // Read and preview CSV
      } else {
        console.warn('Unsupported file type:', file.type);
      }
    });
  }

  // Method to read and parse the CSV file
  readCSVFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const csvContent = event.target.result; // Get the CSV content as a string
      console.log('CSV file content:', csvContent); // Log CSV content

      this.previewData = csvContent.split('\n').map((row: string): string[] => 
        row.split(',').map((cell: string): string => cell.trim()) // Parse CSV into string[][]
      ).filter((rowArray: string[]) => 
        rowArray.length > 1 && rowArray.some((cell: string) => cell !== '' && cell !== 'NULL') // Filter out empty rows
      );

      // Log the parsed and filtered data
      console.log('Parsed CSV data:', this.previewData);
    };
    reader.readAsText(file); // Read the file as text
  }

  // Method to read and parse the XML file
  readXMLFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const xmlContent = event.target.result; // Get the XML content as a string
      console.log('XML file content:', xmlContent); // Log XML content

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'application/xml'); // Parse the XML into a DOM Document
      const json = this.xmlToJson(xmlDoc); // Convert XML to JSON
      this.xmlPreviewString = JSON.stringify(json, null, 2); // Store the stringified JSON for preview

      // Check if xmlPreviewString is correctly filled
      console.log('Parsed XML data:', this.xmlPreviewString);
      this.businessCardPreview = json; // Set the preview data for display
    };
    reader.readAsText(file); // Read the file as text
  }

  // Method to convert XML to JSON (simple implementation)
  xmlToJson(xml: Node): any {
    const obj: any = {};

    if (xml.nodeType === 1) { // Element node
      const element = xml as Element;
      if (element.hasAttributes()) {
        obj["@attributes"] = {};
        const attributes = element.attributes;
        for (let j = 0; j < attributes.length; j++) {
          const attribute = attributes.item(j);
          if (attribute) {
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      }
    } else if (xml.nodeType === 3) { // Text node
      obj["#text"] = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

  // Method to save the uploaded files to the database
  saveToDatabase() {
    if (this.files.length === 0) {
      console.warn('No files to upload.');
      return;
    }
  
    // Iterate over files to process
    this.files.forEach((file) => {
      // Check for CSV files
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Ensure that previewData contains valid data before uploading
        if (this.previewData.length > 0) {
          // Filter out empty rows
          const validData = this.previewData.filter(row => 
            row.some(cell => cell.trim() !== '') // Only keep rows that have non-empty cells
          );
  
          if (validData.length > 0) {
            // Convert validData back to a CSV string
            const csvString = validData.map(row => row.join(',')).join('\n');
  
            // Create a Blob from the CSV string
            const blob = new Blob([csvString], { type: 'text/csv' });
  
            // Create a File object from the Blob
            const csvFile = new File([blob], 'data.csv', { type: 'text/csv' });
  
            // Call the service to upload the CSV file
            this.businessCardService.uploadBusinessCardFile(csvFile).subscribe({
              next: (response) => {
                console.log('CSV data successfully uploaded', response);
                this.isCardSaved = true;
                this.toastr.success('Business card created successfully!', 'Success');// Show success toaster
              },
              error: (err) => {
                console.error('Error uploading CSV data', err);
                this.toastr.error('Failed to create business card.', 'Error'); // Show error toaster
              }
            });
          } else {
            console.warn('No valid data found in CSV for upload.');
          }
        } else {
          console.warn('No data available for upload.');
        }
      } else if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
        // Handle XML file uploads
        this.businessCardService.uploadBusinessCardFile(file).subscribe({
          next: (response) => {
            console.log('XML file successfully uploaded', response);
            this.isCardSaved = true;
            this.toastr.success('Business card created successfully!', 'Success');// Show success toaster
          },
          error: (err) => {
            console.error('Error uploading XML file', err);
            this.toastr.error('Failed to create business card.', 'Error'); // Show error toaster
          }
        });
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
        return '../../assets/xml.png'; // Path to your XML icon
      case 'csv':
        return '../../assets/file.png'; // Path to your CSV icon
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'assets/icons/image-icon.png'; // Path to your image icon
      default:
        return 'assets/icons/default-icon.png'; // Default icon for unsupported file types
    }
  }

  // Method to clear the files and preview
  clearForm() {
    this.files = [];
    this.businessCardPreview = null;
    this.fileInput.nativeElement.value = '';
    this.previewData = [];
    this.xmlPreviewString = null;
    console.log('Form cleared after import.');
  }


  // Call this method whenever xmlPreviewString is updated
  scrollToBottom(): void {
    if (this.xmlPreviewRef) {
      this.xmlPreviewRef.nativeElement.scrollTop = this.xmlPreviewRef.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.businessCardService.uploadBusinessCardFile(file).subscribe(response => {
        console.log('Upload success:', response);
      }, error => {
        console.log('Upload error:', error);
      });
    }
  }
  




}
