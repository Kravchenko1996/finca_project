import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MainComponent} from './pages/main/main.component';
import {RegisterComponent} from './pages/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './pages/auth/auth.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './pages/login/login.component';
import {ToastrModule} from 'ngx-toastr';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EmailConfirmComponent} from './pages/email-confirm/email-confirm.component';
import {CreateAccountDialogComponent} from './shared/components/create-account-dialog/create-account-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ApiInterceptor} from './core/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    AuthComponent,
    LoginComponent,
    EmailConfirmComponent,
    CreateAccountDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),
    MatToolbarModule,
    MatDialogModule,

  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
