import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EmitterService } from '../services/emitter.service';
import { EventChannels } from '../model/eventChannels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Prijavljivanje';
  email: string;
  password: string;
  errorMessage: string;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.userService.login({ password: this.password , email: this.email}).subscribe(
      (user: User) => {
        localStorage.setItem('azaUser', JSON.stringify(user));
        if (user.role === 'user') {
          this.router.navigate(['/user/' + user.id]);
        } else if (user.role === 'admin') {
          this.router.navigate(['/client']);
        }
        EmitterService.get(EventChannels.SUCCESS_LOGIN).emit(JSON.stringify(user));
      }, (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      });
  }
}
