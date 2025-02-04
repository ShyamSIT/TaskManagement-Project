import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: '/default',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'default',
  //       loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
  //     },
  //     {
  //       path: 'typography',
  //       loadComponent: () => import('./demo/elements/typography/typography.component')
  //     },
  //     {
  //       path: 'color',
  //       loadComponent: () => import('./demo/elements/element-color/element-color.component')
  //     },
  //     {
  //       path: 'sample-page',
  //       loadComponent: () => import('./demo/sample-page/sample-page.component')
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   component: GuestComponent,
  //   children: [
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  //     }
  //   ]
  // }

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/theme/layout/admin/admin.module').then((m) => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
