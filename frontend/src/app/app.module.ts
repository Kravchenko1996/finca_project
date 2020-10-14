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
import {ApiInterceptor} from './core/http.interceptor';
import {CategoriesComponent} from './pages/categories/categories.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {CreateCategoryDialogComponent} from './shared/components/create-category-dialog/create-category-dialog.component';
import {CreateTransactionDialogComponent} from './shared/components/create-transaction-dialog/create-transaction-dialog.component';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {CategoryComponent} from './shared/components/category/category.component';
import {EditCategoryDialogComponent} from './shared/components/edit-category-dialog/edit-category-dialog.component';
import {AcknoledgementDialogComponent} from './shared/components/acknoledgement-dialog/acknoledgement-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TransactionComponent} from './shared/components/transaction/transaction.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    AuthComponent,
    LoginComponent,
    EmailConfirmComponent,
    CreateAccountDialogComponent,
    CategoriesComponent,
    TransactionsComponent,
    CreateCategoryDialogComponent,
    CreateTransactionDialogComponent,
    CategoryComponent,
    EditCategoryDialogComponent,
    AcknoledgementDialogComponent,
    TransactionComponent,
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
    MatToolbarModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),

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
