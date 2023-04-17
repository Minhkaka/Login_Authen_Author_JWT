import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SecretComponent } from './secret/secret.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AboutViewComponent } from './about/about-view/about-view.component';
import { AboutEditComponent } from './about/about-edit/about-edit.component';
import { CanLeaveGuard } from './_helpers/can-leave.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
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
  { path: 'secret', component: SecretComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
