import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/services/api/api.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CreateTransactionDialogComponent} from '../../shared/components/create-transaction-dialog/create-transaction-dialog.component';
import {Transaction} from '../../shared/interfaces/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  errors: string[] = [];
  transactions: Transaction[] = [];
  displayedColumns = ['summary', 'date', 'description', 'category', 'account'];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getTransactions();
  }


  createTransaction(): void {
    const dialogRef = this.dialog.open(CreateTransactionDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed()
      .subscribe((result: Transaction) => {
        if (result) {
          this.api.createTransaction(result)
            .subscribe((response: Transaction) => {
                if (response) {
                  this.getTransactions();
                  this.toastr.success('Transaction has been created!');
                }
              }, error => {
                Object.values(error.error).forEach((err: string) => {
                  this.errors.push(err);
                });
                this.errors.forEach((err: string) => {
                  this.toastr.warning(err);
                });
                this.errors = [];
              }
            );
        }
      });
  }

  getTransactions(): void {
    this.api.getTransactions()
      .subscribe((response: Transaction[]) => {
        this.transactions = response;
      });
  }
}
