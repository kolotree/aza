import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { CaseService } from 'src/app/services/case.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { EmitterService } from 'src/app/services/emitter.service';
import { EventChannels } from 'src/app/model/eventChannels';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  pageTitle = 'Dodavanje predmeta';
  caseModel: Case = new Case();
  errorMessage: string;
  statusHasError = true;
  caseStatus: string[] = [];

  constructor(private caseService: CaseService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(
        (user: User) => {
          this.caseModel.user = user;
        }, (error: HttpErrorResponse) => {
          EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
        });
      this.caseService.getStatus().subscribe(
        (status: string[]) => {
          this.caseStatus = status;
      });
    }
  }

  onSubmit(): void {
    EmitterService.get(EventChannels.SPINNER_EVENT).emit('on');
    this.caseService.createCase(this.caseModel).subscribe(
      (c: Case) => {
        this.router.navigate(['/case/' + c.id]);
      }, (error: HttpErrorResponse) => {
        EmitterService.get(EventChannels.SPINNER_EVENT).emit(null);
        EmitterService.get(EventChannels.ERROR_MESSAGE).emit(error.error);
      }, () => {
        EmitterService.get(EventChannels.SPINNER_EVENT).emit(null);
      }
    );
  }

  validateStatus(value: string): void {
    if (this.caseStatus.includes(value)) {
      this.statusHasError = false;
    } else {
      this.statusHasError = true;
    }
  }

}
