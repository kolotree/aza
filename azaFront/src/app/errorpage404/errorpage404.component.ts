import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-errorpage404',
  templateUrl: './errorpage404.component.html',
  styleUrls: ['./errorpage404.component.scss']
})
export class Errorpage404Component implements OnInit {

  pageTitle = 'Greška!';
  url: string;

  constructor(private location: Location,
              private router: Router) { 
    this.router.events.subscribe((value) => {
    if (value instanceof NavigationEnd) {
      this.url = value.url;
    }
  });
  }

  ngOnInit() {
  }

  back(): void {
    this.location.back();
  }

}
