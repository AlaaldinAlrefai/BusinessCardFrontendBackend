import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCard } from '../models/business-card.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  private apiUrl = 'https://localhost:7032/api/BusinessCards'; // Update with your API URL

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
}
