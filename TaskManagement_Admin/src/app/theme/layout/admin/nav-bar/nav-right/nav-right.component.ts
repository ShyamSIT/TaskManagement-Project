// Angular import
import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  
  constructor(
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService
  ) {}
  
  public RoleId = this.storageService.getValue('RoleId');
  public fullname : string = ''
  notifications = [];
  unreadCount = 0;
  showPanel = false;

  ngOnInit(): void {
    const FirstName = this.storageService.getValue('FirstName');
    const LastName = this.storageService.getValue('LastName');
    this.fullname = FirstName + ' ' + LastName;

      this.fetchNotifications();

      setInterval(() => {
        this.fetchNotifications()
      }, 50000);
  }

  fetchNotifications() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.user.getAllNotifications + `?UserId=${UserId}`

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            this.notifications = data.Data;
            this.unreadCount = data.Data.filter(n =>!n.IsRead).length
          }
        }
      })
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }
}
