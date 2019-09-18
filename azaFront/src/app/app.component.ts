import { Component, OnInit } from '@angular/core';
import { EmitterService } from './services/emitter.service';
import { EventChannels } from './model/eventChannels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = 'AZA';
  message: string;

  ngOnInit() {
    EmitterService.get(EventChannels.ERROR_MESSAGE).subscribe(
      value => console.log(value));
  }
}
