import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { EmitterService } from '../services/emitter.service';
import { EventChannels } from '../model/eventChannels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  pageTitle = 'AZA';
  user: User = new User();
  @Input() public showErrorMessage: boolean;
  @Output() public messageEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('azaUser'));
  }

  ngAfterViewInit() {
    EmitterService.get(EventChannels.SUCCESS_LOGIN).subscribe(
      value => {
        this.user = JSON.parse(value);
        console.log('cao');
      }
    );
  }

  hideErrorMessage(): void {
    this.messageEvent.emit(false);
  }

}
