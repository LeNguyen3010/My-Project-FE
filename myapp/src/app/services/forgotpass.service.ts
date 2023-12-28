import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  private baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8080/home/mail';
   }

   sendMail(email:string):Observable<number>{
    return this.http.get<number>(this.baseUrl+"/send-mail?email="+email);
   }

   confirm(confirmBNumber:number):Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl+"/check/"+confirmBNumber);
   }

   findUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(this.baseUrl+"/find-by-email?email="+email)
   }

   changePassword(user:User):Observable<User>{
    return this.http.put<User>(this.baseUrl + "/change-password", user);
   }



}
