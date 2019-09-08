import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  headerDirect = {
    'Content-Type': 'application/json'
  };

  requestOptions = {
    headers: new Headers(this.headerDirect),
  };

  url = 'http://localhost:3000/notes';
  // url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  public updateNotes = new Subject<any>();
  public updatedNotes$ = this.updateNotes.asObservable();

  getMessage() {
    return this.http.get(this.url);
  }

  pushMessage(obj) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post(this.url, obj, options);
  }

  patchMessage(obj): Observable<any> {
    return this.http.patch(this.url + '/' + obj.id, (
      {
        title: obj.title,
        body: obj.body
      }
      ));
  }

  deleteNote(obj) {
    return this.http.delete(this.url + '/' + obj.id);
  }
}
