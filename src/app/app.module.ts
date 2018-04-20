import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { API_KEY } from './app.config';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TaskListService } from './services/task-list.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    NgxSmartModalModule.forRoot(),
    SidebarModule,
    NavbarModule,
    FooterModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    TaskListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
