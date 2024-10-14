import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';

const routes: Routes = [

  { path: 'add', component: AddBusinessCardComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}