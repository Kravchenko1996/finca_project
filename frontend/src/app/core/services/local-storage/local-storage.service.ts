import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setToLocalStorage(key, value): void {
    localStorage.setItem(key, value);
  }

  getFromLocalStorage(key): any {
    return localStorage.getItem(key);
  }
}
