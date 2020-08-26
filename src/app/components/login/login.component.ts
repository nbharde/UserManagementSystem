import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor( 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(): void {
    const userObj = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(userObj).subscribe(data => {
      if (data) {
        const { token, success, user, role } = data;
        if (success) {
          this.authService.storeUserData(token, user, role);
          this.router.navigate(['/users', {username: user}]);
        } else {
          this.errorMessage = 'Unauthorized user';
          return false;
        }
      }
    });
  }
}
