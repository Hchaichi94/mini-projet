import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseURL = "http://localhost:4000/file";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }



  getFiles() {
    return this.http.get(this.baseURL)
  }

  addFile(file: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("file", file);
    return this.http.post<File>(`${this.baseURL}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

}
