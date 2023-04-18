import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AboutViewComponent } from './about-view/about-view.component';
import { CanLeaveGuard } from '../_helpers/can-leave.guard';
import { AboutEditComponent } from './about-edit/about-edit.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'view/:id',
        component: AboutViewComponent,
        canDeactivate: [CanLeaveGuard],
      },
      {
        path: 'edit/:id',
        component: AboutEditComponent,
        canDeactivate: [CanLeaveGuard], // mỗi khi người dùng navigate ra khỏi màn hình edit này, Angular Router sẽ chạy CanLeaveGuard.canDeactivate
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
