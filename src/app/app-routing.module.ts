import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'List of Users' },
    canActivate: [AuthGuard]
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    data: { title: 'User Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add-users',
    component: AddUsersComponent,
    data: { title: 'Add User' },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:id',
    component: EditUsersComponent,
    data: { title: 'Edit User' },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login User' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
