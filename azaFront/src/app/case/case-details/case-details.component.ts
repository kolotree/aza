import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  pageTitle = 'Predmet';
  case: Case = new Case();
  statusButton = 'Izmeni status';
  changeStatus = false;
  caseStatus: string[] = [];

  fileName: string;
  file: File;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private route: ActivatedRoute,
              private caseService: CaseService,
              private afStorage: AngularFireStorage) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCase(id).subscribe(
        (c: Case) => {
          this.case = c;
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
      this.caseService.getStatus().subscribe(
        (status: string[]) => {
          this.caseStatus = status;
      });
    }
  }

  statusAction(): void {
    if (this.changeStatus === false) {
      this.statusButton = 'Izmeni';
      this.changeStatus = true;
    } else {
      this.caseService.updateCaseStatus(this.case).subscribe(
        (c: Case) => {
          this.case = c;
        }, (err: HttpErrorResponse) => {
          console.log(err);
      });
      this.statusButton = 'Izmeni status';
      this.changeStatus = false;
    }
  }

  setFile(event): void {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
      this.file = event.target.files[0];
    }
  }

  upload(): void {
    const path = `test/${Date.now()}${this.fileName}`;
    const task = this.afStorage.upload(path, this.file);
    const ref = this.afStorage.ref(path);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
      })
    )
      .subscribe();
  }
}
