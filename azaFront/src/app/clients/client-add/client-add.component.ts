import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  pageTitle: string = 'Dodavanje klijenta';
  userModel: User = new User('', '', '', '');

  constructor() { }

  ngOnInit() {
  }
  
  onSubmit(): void {
    console.log(this.userModel);
  }

}
