import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmitterService } from 'src/app/services/emitter.service';
import { EventChannels } from 'src/app/model/eventChannels';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  pageTitle = 'Dodavanje klijenta';
  userModel: User = new User();
  errorMessage: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() { }
  onSubmit(): void {
    EmitterService.get(EventChannels.SPINNER_EVENT).emit('on');
    this.userService.createUser(this.userModel).subscribe(
      (user: User) => {
        this.router.navigate(['/client/' + user.id]);
      }, (error: HttpErrorResponse) => {
        EmitterService.get(EventChannels.SPINNER_EVENT).emit(null);
        this.errorMessage = error.error;
      }, () => {
        EmitterService.get(EventChannels.SPINNER_EVENT).emit(null);
      });
  }

}
