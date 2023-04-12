import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SecretComponent } from './secret/secret.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AboutViewComponent } from './about/about-view/about-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'view/:id', component: AboutViewComponent },
      { path: 'edit/:id', component: AboutViewComponent },
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
