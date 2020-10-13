import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-acknoledgement-dialog',
  templateUrl: './acknoledgement-dialog.component.html',
  styleUrls: ['./acknoledgement-dialog.component.scss']
})
export class AcknoledgementDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }
}
