import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCard } from '../models/business-card.model'; // Adjust the import path as necessary

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
  console.log('Filters API:', this.http.get<BusinessCard[]>(this.apiUrlFilter, { params: filters }));
  return this.http.get<BusinessCard[]>(this.apiUrlFilter, { params: filters });
}



exportToCSV(): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/export/csv`, { responseType: 'blob' });
}

exportToXML(): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/export/xml`, { responseType: 'blob' });
}




}
