# WAES Tasks

This project was developed using [Angular 5](https://angular.io/) and all of its latest dependencies. In order to get it running, you need the following packages installed globally:
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [Angular CLI](https://github.com/angular/angular-cli)

The project will request Oauth2 access to your Google Task profile in order to manage your tasks. The applicaton is also hosted at http://waes.fredericoestrela.com.

## Installing packages
After cloning the repository, run `npm install` inside the directory to install all of its dependencies.

## Google API Key
The project is using a test `Google API Key`, but if you want to use your own, you can change it at `src/environments/environment.ts`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).