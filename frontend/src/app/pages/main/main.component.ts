import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../core/services/api/api.service';
import {Account} from '../../shared/interfaces/account';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  accountForm: FormGroup;
  errors: string[] = [];
  accounts: Account[] = [];

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAccounts();
  }

  initForm(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  setAccountToLocalStorage(): void {
    this.localStorage.setToLocalStorage('accountId', this.accounts[0].id);
  }

  getAccounts(): void {
    this.api.getAccounts()
      .subscribe((response: Account[]) => {
        this.accounts = response;
        this.setAccountToLocalStorage();
      });
  }

  logout(): void {
    this.auth.purgeToken();
    this.router.navigateByUrl('auth/login');
  }


  // createAccount(): void {
  //   let account = {
  //     ...this.accountForm.value
  //   };
  //   const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
  //     width: '250px',
  //     data: account
  //   });
  //   dialogRef.afterClosed()
  //     .subscribe(result => {
  //       if (result) {
  //         account = {name: result};
  //         if (account) {
  //           this.api.createAccount(account)
  //             .subscribe((response: Account) => {
  //               if (response) {
  //                 this.toastr.success(`Account ${response.name} created!`);
  //               }
  //             }, error => {
  //               Object.values(error.error).forEach((err: string) => {
  //                 this.errors.push(err);
  //               });
  //               this.errors.forEach((err: string) => {
  //                 this.toastr.warning(err);
  //               });
  //               this.errors = [];
  //             });
  //         }
  //       }
  //     });
  // }
}
