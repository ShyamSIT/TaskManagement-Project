import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getValue(key: string): any {
    if (key == StorageKey.loginData) {
      const info = localStorage.getItem(key);
      return info ? JSON.parse(info) : '';
    } else {
      const loginData = localStorage.getItem(StorageKey.loginData);
      if (loginData) {
        const loginDataObj = JSON.parse(loginData);
        return loginDataObj[key];
      }
    }
  }

  setValue(key: string, value: any): void {
    let newValue = '';
    if (typeof value == 'object') {
      newValue = JSON.stringify(value);
    } else {
      newValue = value;
    }
    localStorage.setItem(key, newValue);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}


export class StorageKey {
  public static loginData = 'LoginData';
  public static branchId = 'BranchId';
}
