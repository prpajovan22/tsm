import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { CreateCategorieComponent } from './components/create-categorie/create-categorie.component';
import { UpdateCategorieComponent } from './components/update-categorie/update-categorie.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'categorie',component:AllCategoriesComponent},
  {path:'create-categorie',component:CreateCategorieComponent},
  {path:'updateCategorie/:id',component:UpdateCategorieComponent},
  {path:'updateProfile',component:UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
