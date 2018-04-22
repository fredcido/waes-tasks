import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  @Input() root: TreeNode;
  @Output() taskSelected: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() taskCompleted: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() blurNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  constructor() { }

  ngOnInit() { }

  selectTask(node: TreeNode) {
    this.taskSelected.emit(node);
  }

  completeTask(node: TreeNode) {
    this.taskCompleted.emit(node);
  }

  triggerBlurNode(node: TreeNode) {
    this.blurNode.emit(node);
  }
}
