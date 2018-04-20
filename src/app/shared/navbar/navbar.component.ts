import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private user: User;

    constructor(
        private router: Router,
        private authService: AuthService,
        private ngZone: NgZone
    ) {
        this.user = this.authService.currentUser;
    }

    ngOnInit() {
    }

    logout() {
        this.authService.signOut().then(() =>  {
            this.ngZone.run(() => {
                this.router.navigateByUrl('signin');
                this.router.navigate(['/signin']);
            });
        });
    }
}
