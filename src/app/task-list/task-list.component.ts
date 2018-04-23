import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TreeNode } from '../models/tree-node.model';
import { CurrentTaskService } from './../services/current-task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  @Input() root: TreeNode;
  @Output() taskSelected: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() taskCompleted: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() blurNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() onChange: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  node: TreeNode = null;

  constructor(
    private currentTaskService: CurrentTaskService
  ) {

  }

  ngOnInit() {
    this.currentTaskService.getObservable().subscribe(task => {
      this.node = task;
  });
  }

  selectTask(node: TreeNode) {
    this.node = node;
    this.taskSelected.emit(node);

    this.currentTaskService.setTask(node);
  }

  completeTask(node: TreeNode) {
    this.taskCompleted.emit(node);
  }

  triggerBlurNode(node: TreeNode) {
    // this.node = null;
    this.blurNode.emit(node);
  }

  changedTask(node: TreeNode) {
    this.onChange.emit(node);
  }

  isSelected(node: TreeNode) {
    return node === this.node;
  }
}
