import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/services/api/api.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CreateCategoryDialogComponent} from '../../shared/components/create-category-dialog/create-category-dialog.component';
import {Category} from '../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  errors: string[] = [];
  categories: Category[] = [];
  accounts: Account[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getAccounts();
    this.getCategories();
  }

  getAccounts(): void {
    this.api.getAccounts()
      .subscribe((response: Account[]) => this.accounts = response);
  }

  getCategories(): void {
    this.api.getCategories()
      .subscribe((response: Category[]) => this.categories = response);
  }

  createCategory(): void {

    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed()
      .subscribe((result: Category) => {
        if (result) {
          this.api.createCategory(result)
            .subscribe((response: Category) => {
              if (response) {
                this.categories.push(response);
                this.toastr.success(`Category ${response.name} has been created!`);
              }
            }, error => {
              Object.values(error.error).forEach((err: string) => {
                this.errors.push(err);
              });
              this.errors.forEach((err: string) => {
                this.toastr.warning(err);
              });
              this.errors = [];
            });
        }
      });
  }

  refreshCategories(category: Category): void {
    const oldCategory = this.categories.find(
      (oldCategory: Category) => category.id === oldCategory.id
    );
    const index: number = this.categories.indexOf(oldCategory);
    this.categories[index] = category;
  }

  removeCategory(categoryId: number): void {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }
}
