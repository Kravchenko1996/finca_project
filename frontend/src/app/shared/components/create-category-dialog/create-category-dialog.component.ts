import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit {
  accounts: Account[] = [];

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.api.getAccounts()
      .subscribe((response: Account[]) => this.accounts = response);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onChange(event, account: Account): void {
    if (event.isUserInput) {
      this.data.account = account.id;
    }
  }

}
