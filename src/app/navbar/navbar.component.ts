import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { CurrentListService } from './../services/current-list.service';
import { User } from '../models/user.model';
import { List } from '../models/list.model';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    user: User;
    currentList: List;
    activeView = 'default';

    @Output() clearCompleted = new EventEmitter();
    @Output() newTask = new EventEmitter();
    @Output() deleteTask = new EventEmitter();
    @Output() refresh = new EventEmitter();
    @Output() moveRight = new EventEmitter();
    @Output() moveLeft = new EventEmitter();
    @Output() moveUp = new EventEmitter();
    @Output() moveDown = new EventEmitter();
    @Output() print = new EventEmitter();
    @Output() onEdit = new EventEmitter();
    @Output() changeView: EventEmitter<string> = new EventEmitter<string>();


    constructor(
        private router: Router,
        private authService: AuthService,
        private ngZone: NgZone,
        private currentListService: CurrentListService
    ) {
        this.user = this.authService.currentUser;
    }

    ngOnInit() {
        this.currentList = this.currentListService.getList();
        this.currentListService.getObservable().subscribe(list => {
            this.currentList = list;
        });
    }

    logout() {
        this.authService.signOut().then(() =>  {
            this.ngZone.run(() => {
                location.reload(true);
                this.router.navigateByUrl('signin');
                this.router.navigate(['/signin']);
            });
        });
    }

    triggerClearCompleted() {
        this.clearCompleted.emit();
    }

    triggerNewTask() {
        this.newTask.emit();
    }

    triggerDeleteTask() {
        this.deleteTask.emit();
    }

    triggerRefresh() {
        this.refresh.emit();
    }

    triggerMoveRight() {
        this.moveRight.emit();
    }

    triggerMoveLeft() {
        this.moveLeft.emit();
    }

    triggerMoveUp() {
        this.moveUp.emit();
    }

    triggerMoveDown() {
        this.moveDown.emit();
    }

    triggerPrint() {
        this.print.emit();
    }

    triggerEditTask() {
        this.onEdit.emit();
    }

    isViewActive(view) {
        return view === this.activeView;
    }

    setView(view) {
        this.activeView = view;
        this.changeView.emit(view);
    }
}
