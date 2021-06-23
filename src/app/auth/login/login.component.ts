import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthModelService } from '../../service/auth-model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  msgErr!: '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthModelService
  ) {
    if (this.authservice.currentAuthor) {
      //if login then redirect to News List
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get formValue() {
    return this.loginForm.controls;
  }

  //submit login
  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.login(this.loginForm.value).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.msgErr = error.error.message;
        this.loading = false;
      }
    );
  }
}
