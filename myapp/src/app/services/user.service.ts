import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders(
    { "No-Auth":"True"}
  );

  private baseUrl: string;

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService
    ){
    this.baseUrl = 'http://localhost:8080';
  }

  registerUser(user: User):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl+"/auth/signup"}`,user);
  }

  login(loginData){
    return this.httpClient.post(`${this.baseUrl+"/auth/signin"}`,loginData,{headers: this.requestHeader});
  }

  checkEmail(email:string):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.baseUrl+"/auth/check-email?email="}`+email);
  }

  findbyEmail(email:string){
    return this.httpClient.get(`${this.baseUrl+"/user/findByEmail?email="}`+email);
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < allowedRoles.length; i++) {
        for (let j = 0; j < userRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

}
