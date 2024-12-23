import { Injectable } from '@angular/core';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageKey } from './storage.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../model/common-model';
import { environment } from 'src/environments/environment';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private apiUrl: ApiUrlHelper,
    private http: HttpClient,
    private router : Router
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
      responseType: 'blob' as 'json',
    };
    const loginData = JSON.parse(localStorage.getItem(StorageKey.loginData));
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + loginData.JWTToken,
      );
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.get(url, httpOptions).pipe(
      tap(() => this.log(`downloadFile success`)),
      catchError(
        this.handleError(
          `downloadFile url = ${JSON.stringify(apiUrl)}`,
          new Blob(),
        ),
      ),
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
}
