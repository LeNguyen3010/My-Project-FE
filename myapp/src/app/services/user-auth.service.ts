import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles():[]{
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(accessToken:string){
    localStorage.setItem('accessToken',accessToken);
  }

  public getToken():string{
    return localStorage.getItem('accessToken');
  }

  public setEmail(email:string){
    localStorage.setItem('email',email)
  }

  public getEmail(){
    return localStorage.getItem('email')
  }

  public setId(id:string){
    localStorage.setItem('id',id)
  }

  public getId(){
    return localStorage.getItem('id')
  }

  public clear(){
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
    localStorage.removeItem('accessToken');
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

}
