import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { PetDetailComponent } from '../app/components/pet-detail/pet-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animal/:id', component: PetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
