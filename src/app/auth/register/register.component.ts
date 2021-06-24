import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModelService } from '../../service/auth-model.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  msgErr!: '';

  constructor(private router: Router, private authservice: AuthModelService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get formValue() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.register(this.registerForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.msgErr = error.error.message;
        this.loading = false;
      }
    );
  }
}
