import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Users } from '../../models/users';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'city', 'country'];
  data: Users[] = [];
  isLoading = true;
  username: string;
  isAdmin: boolean = false;

  constructor(
    private api: ApiService, 
    private router: Router, 
    private authService: AuthService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.checkAdmin();

    this.api.getUsers()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.router.navigate(['login']);
      });
  }

  checkAdmin(): boolean {
    let userRole = ''
    this.authService.currentUserRole.subscribe(result => {userRole = result});
    return userRole === Roles['admin'];
  }
}
