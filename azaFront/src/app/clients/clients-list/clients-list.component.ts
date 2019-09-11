import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  pageTitle: string = 'Klijenti';
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  details(password: string): void {
    this.router.navigate(['/client/' + password]);
  }
}
