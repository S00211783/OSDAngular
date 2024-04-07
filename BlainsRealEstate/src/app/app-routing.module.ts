import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AuthGuard } from '@auth0/auth0-angular';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
  {path: 'calculator', component: CalculatorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
