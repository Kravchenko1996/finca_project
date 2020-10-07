import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../../shared/interfaces/account';
import {Observable} from 'rxjs';
import {LoginResponse} from '../../../shared/interfaces/http-responses';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.baseUrl + '/api/v1beta';
  public token: string;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  createNewUserData(formData: any): Observable<User> {
    return this.httpClient.post(this.apiUrl + '/users/', formData)
      .pipe(map((response) => new User()
        .deserialize(response)
      ));
  }

  loginAccount(body): Observable<LoginResponse> {
    return this.httpClient.post(this.apiUrl + '/api-token-auth/', body)
      .pipe(map((response: LoginResponse) => {
        this.saveToken(response.token);
        return response;
      }));
  }

  refreshToken(body): Observable<object> {
    return this.httpClient.post(this.apiUrl + '/api-token-refresh/', body);
  }

  saveToken(token: string): void {
    localStorage.setItem(environment.tokenKeyName, token);
  }

  getToken(): string {
    return localStorage.getItem(environment.tokenKeyName);
  }

  purgeToken(): void {
    localStorage.removeItem(environment.tokenKeyName);
  }
}
