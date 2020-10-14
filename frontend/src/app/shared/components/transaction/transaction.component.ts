import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '../../interfaces/transaction';
import {Category} from '../../interfaces/category';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() transaction: Transaction;
  @Output() onUpdate: EventEmitter<Transaction> = new EventEmitter<Transaction>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
  }

}
