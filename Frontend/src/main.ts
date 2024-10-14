import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, // Spread the existing providers
    provideToastr({
      timeOut: 3000, // Example configuration for toastr
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
}).catch(err => console.error(err));
