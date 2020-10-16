import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../interfaces/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-transaction-dialog',
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ]
})
export class CreateTransactionDialogComponent implements OnInit {
  categories: Category[] = [];
  createTransactionForm: FormGroup;
  accountId: number;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    public dialogRef: MatDialogRef<CreateTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm(): void {
    this.createTransactionForm = this.formBuilder.group({
      summary: ['', Validators.required],
      date: [moment(new Date()), Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  getCategories(): void {
    this.api.getCategories()
      .subscribe((response: Category[]) => this.categories = response);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): any {
    return {
      summary: this.createTransactionForm.get('summary').value,
      date: this.createTransactionForm.get('date').value.format('YYYY-MM-DD'),
      description: this.createTransactionForm.get('description').value,
      category: this.createTransactionForm.get('category').value,
      account: this.localStorage.getFromLocalStorage('accountId')
    };
  }
}
