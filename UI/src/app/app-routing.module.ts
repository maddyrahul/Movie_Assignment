import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { UserComponent } from './components/user/user.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { AddShowComponent } from './components/add-show/add-show.component';
import { ViewShowComponent } from './components/view-show/view-show.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie-list', component: MovieListComponent ,canActivate: [AuthGuard] , data: { role: 'User' }},
  {path: 'user', component: UserComponent},
  {path:'add-movie', component:AddmovieComponent, canActivate: [AuthGuard] , data: { role: 'Admin' } },
  { path: 'add-show/:movieId', component: AddShowComponent ,canActivate: [AuthGuard] , data: { role: 'Admin' }},
  { path: 'view-show/:movieId', component: ViewShowComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] , data: { role: 'Admin' }}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
