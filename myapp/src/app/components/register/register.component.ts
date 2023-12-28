import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { format } from 'url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required]),
    cpassword: new FormControl(null,[Validators.required]),
    lastname: new FormControl(null,[Validators.required]),
    firstname: new FormControl(null,[Validators.required]),
    birthday: new FormControl(null,[Validators.required])
  },{updateOn : 'submit'});

  checkEmail:boolean = false;

  constructor(private registerService: UserService,
    private router :Router) { }

  ngOnInit() {
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
      return this.registerForm.controls['password'];
  }

  get cpassword(){
    return this.registerForm.controls['cpassword']
  }

  get birthday(){
    return this.registerForm.controls['birthday']
  }

  get lastname(){
    return this.registerForm.controls['lastname']
  }

  get firstname(){
    return this.registerForm.controls['firstname']
  }


  async userRegister(){
    if(!this.registerForm.valid ||
      this.registerForm.value.password != this.registerForm.value.cpassword){
    }
    else{
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      cpassword: this.registerForm.value.cpassword,
      lastName: this.registerForm.value.lastname,
      firstName: this.registerForm.value.firstname,
      birthday: this.registerForm.value.birthday
    };
    await this.checkEmailRegister();
    if(this.checkEmail){
      alert("Tài khoản đã có người sử dụng")
    }
    else{
      this.registerService.registerUser(user).subscribe(data=>{
        alert("Đăng kí thành công")
        this.router.navigate(['/login']);
      },error=>alert("Đăng kí không thành công"))
    }
  }
}

  async checkEmailRegister(){
   await this.registerService.checkEmail(this.registerForm.value.email).toPromise().then(data=>{
      this.checkEmail=data;
      console.log(data)
    },error=>alert("Lỗi"))
    return this.checkEmail;
  }

}







