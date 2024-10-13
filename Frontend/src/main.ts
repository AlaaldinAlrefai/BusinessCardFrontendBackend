import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  // Import additional providers if necessary

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), provideAnimationsAsync('noop')  // Example of adding HttpClient support
  ]
})
  .catch(err => console.error(err));
