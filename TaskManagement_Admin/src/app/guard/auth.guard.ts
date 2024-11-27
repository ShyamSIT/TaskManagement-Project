import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot,  } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonService } from '../core/services/common.service';

@Injectable()
export class canActivate implements CanActivate {
  constructor(
    private authService: AuthService, 
    private commonService: CommonService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
 
    if (!this.authService.isLoggedIn()) {
      localStorage.clear();
      this.commonService.goToLogin();
      return false;
    }else{
      console.log("is logged in")
      return true;
    }
  }
}