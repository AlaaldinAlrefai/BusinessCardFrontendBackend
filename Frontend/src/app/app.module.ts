import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
     // Declare your AppComponent
  ],
  imports: [
    BrowserModule, // Include BrowserModule for browser support
    AppRoutingModule, // Include your AppRoutingModule for routing
    AppComponent
    
  ],
  providers: [
    provideHttpClient()], // Add any services here if needed

})
export class AppModule {}
