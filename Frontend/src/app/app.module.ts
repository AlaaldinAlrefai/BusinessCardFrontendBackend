import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter-options/filter-options.component';

@NgModule({
  declarations: [
    
    //FilterComponent
     // Declare your AppComponent
  ],
  imports: [
    BrowserModule, // Include BrowserModule for browser support
    AppRoutingModule, // Include your AppRoutingModule for routing
    AppComponent,
    FormsModule,
    CommonModule,
    FilterComponent,
    
  ],
  providers: [
    provideHttpClient()], // Add any services here if needed

})
export class AppModule {}
