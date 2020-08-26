import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Users } from '../../models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  users: Users = { id: '', username: '', name: '', email: '', password: null, city: '', country: '' };
  isLoading: boolean = true;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsersDetails(this.route.snapshot.params.id);
    this.isAdmin = this.checkAdmin();
  }

  checkAdmin(): boolean {
    let userRole = ''
    this.authService.currentUserRole.subscribe(result => {userRole = result});
    return userRole === Roles['admin'];
  }

  getUsersDetails(id: string): void {
    this.api.getUserById(id)
      .subscribe((data: any) => {
        this.users = data;
        this.isLoading = false;
      });
  }

  deleteUser(id: any): void {
    this.isLoading = true;
    this.api.deleteUser(id)
      .subscribe(res => {
        this.isLoading = false;
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      }
      );
  }
}
