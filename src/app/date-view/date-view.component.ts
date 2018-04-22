import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html'
})
export class DateViewComponent implements OnInit {

  @Input() root: TreeNode;

  constructor() { }

  ngOnInit() {
  }
}
