import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../../shared/interfaces/account';
import {map} from 'rxjs/operators';
import {Category} from '../../../shared/interfaces/category';
import {Transaction} from '../../../shared/interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.baseUrl + '/api/v1beta';

  constructor(
    private http: HttpClient,
  ) {
  }

  createAccount(form): any {
    return this.http.post(this.apiUrl + '/create-account', form)
      .pipe(map(
        (response) => new Account()
          .deserialize(response)
        )
      );
  }

  getAccounts(): any {
    return this.http.get(this.apiUrl + '/accounts')
      .pipe(map(
        (response: Account[]) => response
          .map(
            (account: Account) => new Account()
              .deserialize(account)
          )
        )
      );
  }

  createCategory(form): any {
    return this.http.post(this.apiUrl + '/create-category', form)
      .pipe(map(
        (response: Category) => new Category()
          .deserialize(response)
        )
      );
  }

  getCategories(): any {
    return this.http.get(this.apiUrl + '/categories')
      .pipe(map(
        (response: Category[]) => response
          .map(
            (category: Category) => new Category()
              .deserialize(category)
          )
        )
      );
  }

  editCategory(category: Category): any {
    return this.http.put(this.apiUrl + '/edit-category/' + category.id.toString(), category)
      .pipe(map(
        (response: Category) => new Category()
          .deserialize(response)
        )
      );
  }

  deleteCategory(categoryId: number): any {
    return this.http.delete(this.apiUrl + '/delete-category/' + categoryId.toString());
  }

  createTransaction(form): any {
    return this.http.post(this.apiUrl + '/create-transaction', form)
      .pipe(map(
        (response: Transaction) => new Transaction()
          .deserialize(response)
      ));
  }

  getTransactions(): any {
    return this.http.get(this.apiUrl + '/transactions')
      .pipe(map(
        (response: Transaction[]) => response
          .map(
            (transaction: Transaction) => new Transaction()
              .deserialize(transaction)
          )
        )
      );
  }

}
