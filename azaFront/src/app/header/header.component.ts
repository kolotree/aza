import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle = 'AZA';
  @Input() public showErrorMessage: boolean;
  @Output() public messageEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hideErrorMessage(): void {
    this.messageEvent.emit(false);
  }

}
