import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  pageTitle: string = 'Dodavanje klijenta';
  userModel: User = new User();
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
  
  onSubmit(): void {
    this.userService.createUser(this.userModel).subscribe({
      next: user => {
        this.router.navigate(['/client/' + user.id]);
      },
      error: err => this.errorMessage = err
    });
  }

}
