import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { Document } from 'src/app/model/document';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, from } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';

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
  canUpload = false;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private route: ActivatedRoute,
              private caseService: CaseService,
              private afStorage: AngularFireStorage,
              private documentService: DocumentService) { }

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
          this.case.status = c.status;
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
      this.canUpload = true;
    }
  }

  upload(): void {
    this.canUpload = false;
    const path = `${this.case.user.id}/${Date.now()}_${this.fileName}`;
    const task = this.afStorage.upload(path, this.file);
    const ref = this.afStorage.ref(path);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(value => {
          const document: Document = { id: null, name: this.fileName, reference: value, caseId: this.case.id };
          this.documentService.createDocument(document).subscribe(
            (doc: Document) => {
              this.case.documents.push(doc);
            }
          );
          this.fileName = null;
          this.file = null;
          this.uploadProgress = null;
        });
      })
    ).subscribe();
  }
}
