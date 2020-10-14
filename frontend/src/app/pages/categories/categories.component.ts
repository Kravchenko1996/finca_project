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
  categoryForm: FormGroup;
  errors: string[] = [];
  categories: Category[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  initForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      account: ['', Validators.required]
    });
  }

  createCategory(): void {
    let category = {
      ...this.categoryForm.value
    };
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '250px',
      data: category
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          category = {
            name: result.name,
            account: result.account
          };
          if (category) {
            this.api.createCategory(category)
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

  getCategories(): void {
    this.api.getCategories()
      .subscribe((response: Category[]) => this.categories = response);
  }

}
