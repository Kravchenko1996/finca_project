import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../core/services/api/api.service';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  }

  ngOnInit(): void {
  }



  onCancel(): void {
    this.dialogRef.close();
  }
}
