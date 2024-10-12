import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';

const routes: Routes = [
  { path: 'add', component: AddBusinessCardComponent },
  { path: 'list', component: BusinessCardListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' } // Redirect to list by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot to configure routes
  exports: [RouterModule] // Export RouterModule
})
export class AppRoutingModule { }
