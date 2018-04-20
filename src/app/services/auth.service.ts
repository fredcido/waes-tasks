import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { API_KEY, SCOPE, ROOT_URL } from '../app.config';

declare const gapi: any;

@Injectable()
export class AuthService {
    private googleAuth: any;
    private user: User;

    constructor() {
        this.googleAuth = gapi.auth2.getAuthInstance();
        const profile = this.googleAuth.currentUser.get().getBasicProfile();
        if (profile) {
            this.setUser(profile);
        }
    }

    setUser(profile) {
        this.user = new User(profile.getId(), profile.getName());
    }

    signIn(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
          this.googleAuth.signIn({
            // Show the prompt
            'prompt': 'consent'
          }).then(googleUser => {
            const profile = googleUser.getBasicProfile();
            this.setUser(profile);
            resolve(this.user);
          }, reject);
        });
      }

    signOut(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.googleAuth.signOut().then(res => resolve(res), reject);
        });
    }

    get currentUser(): User {
        return this.user;
    }

    get isSignedIn(): boolean {
        return this.currentUser != null;
    }
}