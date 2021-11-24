import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized:boolean = false;
  public isUser:boolean = false;
  public isAdmin:boolean = false;
  constructor() { }

  loginUser(){
    if(localStorage.getItem('username') === 'user'){
      this.isUser = true;
    }
    else if(localStorage.getItem('username') === 'admin') {
      this.isUser = true;
      this.isAdmin = true;
    }
    //this.isAuthorized = true;
  }
  logoutUser(){
    this.isUser = false;
    this.isAdmin = false;
  }
  login(){
    this.isAuthorized = true;
  }
  logout(){
    this.isAuthorized = false;
  }
}
