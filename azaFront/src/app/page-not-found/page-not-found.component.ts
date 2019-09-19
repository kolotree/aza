import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  pageTitle = 'Stranica nije pronađena!';
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
