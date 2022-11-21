import { Component, OnInit } from '@angular/core';

import {MmmToastService} from 'mmm-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private mmmToastService: MmmToastService) {}

  ngOnInit() {
    this.mmmToastService.receiveGlobalConfigs({
      theme: 'material',
      timeout: 10000,
      position: 'top-left',
      limit: 3,
    });
  }
}
