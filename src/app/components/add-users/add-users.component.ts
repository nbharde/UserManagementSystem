import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent implements OnInit {
  userForm: FormGroup;
  name = '';
  username  = '';
  email  = '';
  password  =  '';
  city = '';
  country = '';
  role = '';
  isLoading = false;
  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoading = true;
    this.api.addUser(this.userForm.value)
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoading = false;
        this.router.navigate(['/user-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
