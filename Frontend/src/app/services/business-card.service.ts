
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BusinessCard } from '../models/business-card.model'; // Adjust the import path as necessary
import { ImportResponse } from '../models/import-response.model';
import { jsQR } from 'jsqr';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  private apiUrl = 'https://localhost:7032/api/BusinessCards'; // Update with your API URL
  private apiUrlFilter = 'https://localhost:7032/api/BusinessCards/filter';

  constructor(private http: HttpClient) {}

  // Get all business cards
  getBusinessCards(): Observable<BusinessCard[]> {
    return this.http.get<BusinessCard[]>(this.apiUrl);
  }

  deleteBusinessCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addBusinessCard(card: BusinessCard): Observable<BusinessCard> {
    return this.http.post<BusinessCard>(this.apiUrl, card); // Send a POST request to add the card
  }




  // Filter business cards
  filterBusinessCards(filters: any): Observable<BusinessCard[]> {
    console.log('Filters being sent to the API:', filters); // Log filters for debugging
    return this.http.get<BusinessCard[]>(this.apiUrlFilter, { params: filters });
  }




  exportToCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/csv`, { responseType: 'blob' });
  }

  exportToXML(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/xml`, { responseType: 'blob' });
  }




  // Method to import XML data
  
importXML(file: File): Observable<ImportResponse> {
  const formData = new FormData();
  formData.append('file', file); // Append the XML file to the form data

  return this.http.post<ImportResponse>(`${this.apiUrl}/import`, formData).pipe(
    tap(response => {
      console.log('Import response:', response); // Log the response
    }),
    catchError(error => {
      console.error('Error importing XML:', error);
      return throwError(error);
    })
  );
}

  





  
  
  

  // Method to import CSV data
importCSV(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file); // Append the file to the form data

  return this.http.post(`${this.apiUrl}/import`, formData); // No `/csv` here
}




importQRCode(file: File) {
  const reader = new FileReader();
  reader.onload = (event: any) => {
    const imageData = event.target.result; // Get the image data as a base64 string
    const imageElement = new Image();
    imageElement.src = imageData;
    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          console.log('QR Code Data:', code.data);
          // Handle QR code data (e.g., send it to the backend or preview it)
        } else {
          console.error('No QR code found.');
        }
      }
    };
  };
  reader.readAsDataURL(file); // Read the file as a data URL
}

  





  updateBusinessCard(id: number, updatedData: any) {
    return this.http.put(`https://localhost:7032/api/BusinessCards/${id}`, updatedData);
  }









}
