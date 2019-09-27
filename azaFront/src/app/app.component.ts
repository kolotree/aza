import { Component, OnInit, AfterViewInit} from '@angular/core';
import { EmitterService } from './services/emitter.service';
import { EventChannels } from './model/eventChannels';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  showErrorMessage = false;
  message: string;

  constructor(private location: Location) { }

  ngOnInit() { }

  ngAfterViewInit() {
    EmitterService.get(EventChannels.ERROR_MESSAGE).subscribe(
      value => {
        if (typeof (value) === 'object') {
          this.message = 'Došlo je do greške!';
        } else {
          this.message = value;
        }
        this.showErrorMessage = true;
      }
    );
  }

  back(): void {
    this.showErrorMessage = false;
    this.location.back();
  }
}
