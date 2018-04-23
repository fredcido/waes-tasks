import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { API_KEY } from './app.config';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddListComponent } from './add-list/add-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DateViewComponent } from './date-view/date-view.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TaskListService } from './services/task-list.service';
import { AlertService } from './services/alert.service';
import { TaskService } from './services/task.service';
import { CurrentListService } from './services/current-list.service';
import { CurrentTaskService } from './services/current-task.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    TasksComponent,
    SignInComponent,
    AddListComponent,
    TaskListComponent,
    EditTaskComponent,
    DateViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TaskListService,
    AlertService,
    TaskService,
    CurrentListService,
    CurrentTaskService
  ],
  entryComponents: [AddListComponent, EditTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
