import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  pageTitle: string = 'Klijenti';
  users: User[] = [];
  usersSearch: User[] = [];
  searchName: string = '';
  searchSurname: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.usersSearch = users;
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });
  }

  searchUsers(): void{
    this.usersSearch = this.users.filter((user: User) =>
      user.name.toLocaleLowerCase().indexOf(this.searchName.toLocaleLowerCase()) !== -1
      && user.surname.toLocaleLowerCase().indexOf(this.searchSurname.toLocaleLowerCase()) !== -1);
  }
  
  details(id: string): void {
    this.router.navigate(['/client/' + id]);
  }
}
