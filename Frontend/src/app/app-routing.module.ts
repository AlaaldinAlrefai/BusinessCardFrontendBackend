import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component'; // Update the path as necessary
import { BusinessCardListComponent } from './business-card-list/business-card-list.component'; // Update the path as necessary

const routes: Routes = [
  { path: 'add', component: AddBusinessCardComponent },
  { path: 'list', component: BusinessCardListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' } // Redirect to the list by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Export RouterModule so it can be used in the AppModule
})
export class AppRoutingModule {}
