import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { TokenInfo } from './models';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'artspace';

  logged = false;
  submitted = false;
  tokenInfo!: TokenInfo;
  showModalLogin!: boolean;
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  showLogin() {
    this.showModalLogin = true;
  }

  showReg() {
    alert('Sorry, registration is currently closed.');
  }

  hideLogin() {
    this.showModalLogin = false;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.access);
          this.showModalLogin = false;
          this.logged = true;
          this.loginError = '';
        },
        error: (error) => {
          this.loginError = error.message;
        },
      });
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.logged = false;
      localStorage.removeItem('token');
    }
  }

  getMyProfile() {
    this.tokenInfo = jwt_decode(localStorage.getItem('token')!);
    return `/${this.tokenInfo.user_id}`;
  }
}
