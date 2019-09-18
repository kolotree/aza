import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  pageTitle = 'Dodavanje klijenta';
  userModel: User = new User();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() { }
  onSubmit(): void {
    this.userService.createUser(this.userModel).subscribe(
      (user: User) => {
        this.router.navigate(['/client/' + user.id]);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

}
