import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  userForm: FormGroup;
  id = '';
  username  = '';
  name = '';
  email = '';
  password  = '';
  city = '';
  country = '';
  role = '';
  isLoading = false;
  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.params.id);
    this.userForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  getUserById(id: any): void {
    this.api.getUserById(id).subscribe((data: any) => {
      this.id = data.id;
      this.userForm.setValue({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        city: data.city,
        country: data.country,
        role: data.role
      });
    });
  }

  onFormSubmit(): void {
    this.isLoading = true;
    this.api.updateUser(this.id, this.userForm.getRawValue())
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoading = false;
        this.router.navigate(['/user-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
      );
  }

  usersDetails(): void {
    this.router.navigate(['/user-details', this.id]);
  }
}
