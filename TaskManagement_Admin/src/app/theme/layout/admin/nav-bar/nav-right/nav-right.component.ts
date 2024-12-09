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

  public fullname : string = ''

  ngOnInit(): void {
    const FirstName = this.storageService.getValue('FirstName');
    const LastName = this.storageService.getValue('LastName');

    this.fullname = FirstName + ' ' + LastName;
  }
}
