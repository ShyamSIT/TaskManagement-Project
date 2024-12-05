import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { CommonService } from '../core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService : StorageService,
    private route   : Router,
    private commonService : CommonService,
  ) { }

  isLoggedIn() : boolean {
    const loginData  = this.storageService.getValue(StorageKey.loginData)
    if(loginData) {
      const payload = loginData.JwtToken.toString().split('.')[1]
      const parsedPayload = JSON.parse(atob(payload)); // convert payload into an Object
      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    return false;
  }
}
