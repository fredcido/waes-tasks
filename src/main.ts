import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { API_KEY, SCOPE } from 'app/app.config';

if (environment.production) {
  enableProdMode();
}

declare const gapi: any;
gapi.load('client:auth2', () => {
  gapi.client.init({
      'clientId': API_KEY,
      'cookiepolicy': 'single_host_origin',
      'scope': SCOPE
  }).then(() => {
      platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
