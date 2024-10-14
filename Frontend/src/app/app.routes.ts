
import { Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';

export const routes: Routes = [
  { path: 'add', component: AddBusinessCardComponent },
  { path: 'list', component: BusinessCardListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }, // Default redirect to list
  { path: '**', redirectTo: '/list' } // Fallback route for non-matching paths
];

