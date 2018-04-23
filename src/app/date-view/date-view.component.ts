import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import * as moment from 'moment';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html'
})
export class DateViewComponent implements OnInit {

  @Input() root: TreeNode;
  @Output() taskSelected: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() taskCompleted: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() blurNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  @Output() onChange: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  dateItems = [];
  node: TreeNode = null;

  constructor() { }

  ngOnInit() {
    const temp = {};
    this.addTasks(this.root.children, temp);

    this.dateItems = Object.keys(temp).map(key => temp[key]);
  }

  addTasks(children: TreeNode[], temp) {
    children.forEach(node => {
        const task = node.item;
        let date = 'No due date';
        if (task.due) {
            date = moment(task.due).format('ddd, MMM DD, YYYY');
        }

        if (!temp.hasOwnProperty(date)) {
          temp[date] = {
              date: date,
              items: []
          };
        }

        temp[date].items.push(node);

        this.addTasks(node.children, temp);
    });
  }

  selectTask(node: TreeNode) {
    this.node = node;
    this.taskSelected.emit(node);
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
