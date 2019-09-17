import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  get isAdmin(): boolean {
    return this._isAdmin;
  }

  private _isAdmin = false;

  enableAdminMode() {
    this._isAdmin = true;
    console.warn('Admin mode enabled!');
  }
}
