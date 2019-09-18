import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventChannels } from 'src/app/model/eventChannels';
import { EmitterService } from 'src/app/services/emitter.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  pageTitle = 'Klijent';
  client: User = new User();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(
        (user: User) => {
          this.client = user;
        }, (error: HttpErrorResponse) => {
          this.router.navigate(['/errorpage404']);
      });
    }
  }

}
