import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { API_KEY } from './app.config';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddListComponent } from './add-list/add-list.component';
import { TaskListComponent } from './task-list/task-list.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TaskListService } from './services/task-list.service';
import { AlertService } from './services/alert.service';
import { TaskService } from './services/task.service';
import { CurrentListService } from './services/current-list.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SignInComponent,
    AddListComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    MatDialogModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TaskListService,
    AlertService,
    TaskService,
    CurrentListService
  ],
  entryComponents: [AddListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
