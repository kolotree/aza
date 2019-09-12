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
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err
    });
  }

  details(id: string): void {
    this.router.navigate(['/client/' + id]);
  }
}
