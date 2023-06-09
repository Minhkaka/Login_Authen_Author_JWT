import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SecretComponent } from './secret/secret.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthInterceptor } from './_helpers/interceptor';
import { AboutModule } from './about/about.module';
import { ShareModule } from './share/share.module';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecretComponent,
    ProjectsComponent,
    DialogLoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AboutModule,
    AppRoutingModule,
    ShareModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [DialogLoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
