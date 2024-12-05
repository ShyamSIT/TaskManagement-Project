// Angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// project import
import { NavigationItem } from '../navigation';
import { environment } from 'src/environments/environment';

import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})

export class NavContentComponent implements OnInit {
   navigationItmes = []
  // public props
  @Output() NavCollapsedMob: EventEmitter<any> = new EventEmitter();

  // version
  currentApplicationVersion = environment.appVersion;

  navigation: any;
  windowWidth = window.innerWidth;

  // Constructor
  constructor(
    public nav: NavigationItem,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private apiUrl :ApiUrlHelper, 
    private commonService : CommonService,
    private storageService: StorageService
  ) {
    
  }

  // Life cycle events
  ngOnInit() {
    this.getRoleRights();

    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
  }

  
  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }

  getRoleRights(){
    const roleId = this.storageService.getValue('RoleId')
    const apiUrl = this.apiUrl.apiUrl.roleRight.getRoleRightsById + '?RoleId=' + roleId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe((data) =>{
        if(data && data.Success && data.Data){
          console.log(data.Data);
          this.navigationItmes = data.Data.RoleRights.map(role => ({
            id: role.MenuId,
            title: role.MenuName,
            type: 'item',
            url: role.MenuUrl,
            icon: role.MenuIcon || 'feather icon-user',
            classes: 'nav-item'
          }))

          this.navigation = [...this.navigationItmes]
        }
      });
  }
}
