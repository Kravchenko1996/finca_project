import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../interfaces/category';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../../core/services/api/api.service';
import {EditCategoryDialogComponent} from '../edit-category-dialog/edit-category-dialog.component';
import {AcknoledgementDialogComponent} from '../acknoledgement-dialog/acknoledgement-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() category: Category;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
  }

  editCategory(): void {
    const dialogWindow = this.dialog.open(EditCategoryDialogComponent, {
      width: '250px',
      data: new Category().deserialize(this.category)
    });
    dialogWindow.afterClosed()
      .subscribe((category: Category) => {
          if (category) {
            this.api.editCategory(category)
              .subscribe(result => console.log(result));
          }
        }
      );
  }

  deleteCategory(): void {
    const dialogWindow = this.dialog.open(AcknoledgementDialogComponent, {
      width: '250px',
      data: `Are you sure you want to delete "${this.category.name}"?`
    });
    dialogWindow.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.api.deleteCategory(this.category.id)
            .subscribe();
        }
      })
  }

}
