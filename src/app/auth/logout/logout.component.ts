import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModelService } from 'src/app/service/auth-model.service';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private authModelService: AuthModelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authModelService.logout();
    this.router.navigate(['login']);
  }
}
