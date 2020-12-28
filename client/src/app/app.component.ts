import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../app/shared/file-upload-service.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { File } from './shared/file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  files: any = [];
  file: any;
  percentDone: any = 0;
  form: FormGroup;
  preview = "http://localhost:4000/uploads//test.jpg"
  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService) {
    this.form = this.fb.group({})
  }

  ngOnInit() { this.getFiles() }

  uploadFile(event: any) {
    const f = event.target.files[0];
    this.file = f
  }

  submitForm() {
    this.fileUploadService.addFile(
      this.file,
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          event.total ? this.percentDone = Math.round(100 * event.loaded / event.total) : this.percentDone = 26
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
      }
      this.getFiles()
    })
  }

  getFiles() {
    this.fileUploadService.getFiles().subscribe((res) => {
      this.files = res;
    })
  }


}
