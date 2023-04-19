import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutViewComponent } from './about-view/about-view.component';
import { AboutEditComponent } from './about-edit/about-edit.component';
import { AboutComponent } from './about.component';
import { AboutListComponent } from './about-list/about-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, ShareModule],
  declarations: [
    AboutViewComponent,
    AboutEditComponent,
    AboutComponent,
    AboutListComponent,
  ],
})
export class AboutModule {}
