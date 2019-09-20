import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmitterService } from 'src/app/services/emitter.service';
import { EventChannels } from 'src/app/model/eventChannels';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  pageTitle = 'Klijenti';
  users: User[] = [];
  searchName = '';
  searchSurname = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }, (error: HttpErrorResponse) => {
        EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
      });
  }

  searchUsers(): void {
    const search = { name: this.searchName, surname: this.searchSurname };
    this.userService.searchUsers(search).subscribe(
      (users: User[]) => {
        this.users = users;
      }, (error: HttpErrorResponse) => {
        EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
      }
    );
  }
  details(id: string): void {
    this.router.navigate(['/client/' + id]);
  }
}
