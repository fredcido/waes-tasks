import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.currentUser) {
      this.router.navigateByUrl('');
    }
  }

  signIn(): void {
    this.authService.signIn()
      .then(_ => this.router.navigateByUrl(''))
      .catch(error => console.log(error));
  }
}