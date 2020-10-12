import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../../../shared/interfaces/account';
import {map} from 'rxjs/operators';
import {User} from '../../../shared/interfaces/user';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.baseUrl + '/api/v1beta';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  createAccount(form): any {
    return this.http.post(this.apiUrl + '/create-account', form)
      .pipe(map((response) => new Account()
        .deserialize(response)
      ));
  }

  getUserData(): any {
    return this.http.get(this.apiUrl + '/user')
      .pipe(map((response: User) => new User()
        .deserialize(response)
      ));
  }

}
