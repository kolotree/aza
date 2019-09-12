import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  pageTitle: string = 'Klijent'
  client: User = new User();
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe({
        next: user => {
          this.client = user;
        },
        error: err => this.errorMessage = err
      });
    }
  }

}
