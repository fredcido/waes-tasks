import { AuthService as Base } from './../auth.service';

import { User } from '../../models/user.model';

export class AuthService {

    signIn(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const user = new User('1', 'Test');
            resolve(user);
          }
        );
      }

    signOut(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve(true);
        });
    }
}
