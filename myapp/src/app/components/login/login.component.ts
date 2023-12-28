import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required]),
  },{updateOn : 'submit'});

  constructor(private userService: UserService,
     private userAuthService: UserAuthService,
     private router: Router
     ) { }

  ngOnInit( ) {
  }

  localForm:boolean;

  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

    login(){
      if(!this.loginForm.valid){
      }else{
      const login ={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.userService.login(login).subscribe(
      (response:any )=>{
        const role = response.roles[0];
        this.userAuthService.setId(response.id)
        this.userAuthService.setEmail(response.email)
        this.userAuthService.setRoles(response.roles);
        this.userAuthService.setToken(response.token);
        if(role === 'ROLE_USER'){
            this.router.navigate(['/'])
        }
        if(role === 'ROLE_ADMIN'){
          this.router.navigate(['/'])
      }
      },error => alert("Tài khoản mật khẩu không chính xác"))
    }
  }
}
