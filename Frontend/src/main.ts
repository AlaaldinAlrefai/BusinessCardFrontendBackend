import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Import additional providers if necessary

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  // Example of adding HttpClient support
  ]
})
  .catch(err => console.error(err));
