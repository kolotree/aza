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
  showSpinner = false;
  @Input() public showErrorMessage: boolean;
  @Output() public messageEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const u = localStorage.getItem('azaUser');
    if (u) {
      this.user = JSON.parse(u);
    }
  }

  ngAfterViewInit() {
    EmitterService.get(EventChannels.SUCCESS_LOGIN).subscribe(
      value => {
        this.user = JSON.parse(value);
      }
    );
    EmitterService.get(EventChannels.SPINNER_EVENT).subscribe(
      value => {
        if (value === 'on') {
          this.showSpinner = true;
        } else {
          this.showSpinner = false;
        }
      }
    );
  }

  hideErrorMessage(): void {
    this.messageEvent.emit(false);
  }

  logout(): void {
    this.user = new User();
    localStorage.removeItem('azaUser');
  }
}
