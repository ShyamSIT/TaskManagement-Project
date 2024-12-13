import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService : StorageService,private router: Router,private modalService : NgbModal) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getValue('JwtToken')

    if(token){
      const clonedReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      });

      return next.handle(clonedReq).pipe(
        tap(
          Succ => {},
          err => {
            if(err.code === 401){
              this.modalService.dismissAll()
              localStorage.clear();
              this.router.navigate(['/auth/login']);
            }
          }
        ) 
      )
    }
    else{
      return next.handle(req.clone()).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              this.modalService.dismissAll()
              localStorage.clear();
              this.router.navigate(['/auth/login']);
            }
          }
        ))
    }
  }
};

