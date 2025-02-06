import { Injectable } from '@angular/core';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageKey } from './storage.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../model/common-model';
import { environment } from 'src/environments/environment';
import { Buffer } from 'buffer';
import { formatDate } from '@angular/common';
import { ChatMessageModel } from '../model/chat-message-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private apiUrl: ApiUrlHelper,
    private http: HttpClient,
    private router: Router
  ) {}

  private log(message: string) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  doGet(apiUrl: string): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    const loginData = JSON.parse(localStorage.getItem(StorageKey.loginData));

    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData.JwtToken);
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.get<ApiResponse>(url, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError(
        this.handleError<ApiResponse>(`doGet url = ${JSON.stringify(apiUrl)}`, {
          Data: null,
          Message: 'Something went wrong. Please try again after sometime.',
          Success: false,
          TAID: null
        })
      )
    );
  }

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    const loginData = JSON.parse(localStorage.getItem(StorageKey.loginData));
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData.JwtToken);
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, httpOptions).pipe(
      tap(() => this.log(`doPost success`)),
      catchError(
        this.handleError<ApiResponse>(`doPost data = ${JSON.stringify(postData)}`, {
          Data: null,
          Message: 'Something went wrong. Please try again after sometime.',
          Success: false,
          TAID: null
        })
      )
    );
  }

  downloadFile(apiUrl: string): any {
    const httpOptions = {
      headers: new HttpHeaders(),
      responseType: 'blob' as 'json'
    };
    const loginData = JSON.parse(localStorage.getItem(StorageKey.loginData));
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData.JWTToken);
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.get(url, httpOptions).pipe(
      tap(() => this.log(`downloadFile success`)),
      catchError(this.handleError(`downloadFile url = ${JSON.stringify(apiUrl)}`, new Blob()))
    );
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  encodeBase64(plainString: string): string {
    return Buffer.from(plainString, 'ascii').toString('base64');
  }

  decodeBase64(Base64String: string): string {
    if (Base64String) {
      return Buffer.from(Base64String, 'base64').toString('ascii');
    } else {
      return '""';
    }
  }

  getDateDifference(dateString: string): string {
    const today = new Date();
    const messageDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    messageDate.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - messageDate.getTime();
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
      return messageDate.toLocaleDateString('en-US', options);
    } else {
      return formatDate(messageDate, 'dd-MM-yyyy', 'en-US');
    }
  }

  groupMessages(messages: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const groupedMessages = new Map<string, ChatMessageModel[]>();
    // messages.sort((a, b) => new Date(b.SentAt).getTime() - new Date(a.SentAt).getTime());

    messages.forEach((message) => {
      const senddate = new Date(message.SentAt);
      senddate.setHours(0, 0, 0, 0);
      const diff = Math.floor((today.getTime() - senddate.getTime()) / (1000 * 60 * 60 * 24));
      let key = '';

      if (diff == 0) {
        key = 'Today';
      } else if (diff == 1) {
        key = 'Yesterday';
      } else if (diff < 7) {
        key = senddate.toLocaleDateString('en-US', { weekday: 'long' });
      } else {
        key = formatDate(message.SentAt, 'dd/MMM/yy', 'en-US');
      }

      if (!groupedMessages.has(key)) {
        groupedMessages.set(key, []);
      }
      groupedMessages.get(key)!.push(message);
    });

    return groupedMessages
  }
}
