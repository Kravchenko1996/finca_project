import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit {
  createCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.createCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): any {
    return {
      name: this.createCategoryForm.get('name').value,
      account: this.localStorage.getFromLocalStorage('accountId')
    };
  }

}
