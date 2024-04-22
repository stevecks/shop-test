import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginModel } from '../../auth/interfaces/login-model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RegistrationModel } from '../../auth/interfaces/registration-model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(
    public authService: AuthService,
    //private router: Router,
    //private location: Location,
  ) { }

  public RegisterForm = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required),
    passwordConfirm: new FormControl<string>('', Validators.required)
  });

  public get firstName(): FormControl<string> {
    return this.RegisterForm.get('firstName') as FormControl<string>;
  }

  public get lastName(): FormControl<string> {
    return this.RegisterForm.get('lastName') as FormControl<string>;
  }

  public get email(): FormControl<string> {
    return this.RegisterForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.RegisterForm.get('password') as FormControl<string>;
  }

  public get passwordConfirm(): FormControl<string> {
    return this.RegisterForm.get('passwordConfirm') as FormControl<string>;
  }

  public register(): void {
    let RegisterModel: RegistrationModel = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      passwordConfirm: this.passwordConfirm.value
    };
    this.authService.register(RegisterModel).subscribe(() => {
      alert("Hey!");
    });
  }

  public loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required)
  });

  public get emailLog(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string>;
  }

  public get passwordLog(): FormControl<string> {
    return this.loginForm.get('password') as FormControl<string>;
  }

  public login(): void {
    let loginModel: LoginModel = {
      email: this.emailLog.value,
      password: this.passwordLog.value
    };
    this.authService.login(loginModel).subscribe({
      next: () => {
        //alert("Yes!");
      },
      error: () => {
        alert("Nope");
      }
    });
  }

  public logout(): void {
    this.authService.logout();
  }
  
}
