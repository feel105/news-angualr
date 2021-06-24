import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './helper/auth.guard';
import { AddEditComponent } from './news/add-edit/add-edit.component';
import { NewsListComponent } from './news/news-list/news-list.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
