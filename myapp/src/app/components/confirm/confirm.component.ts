import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { ForgotpassService } from 'src/app/services/forgotpass.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private forgotPassService:ForgotpassService
    , private router:Router) { }

  ngOnInit() {
  }

  checkConfirm:boolean;

  confirm(confirmNumber:number){
    if(!confirmNumber){
      alert("Bạn chưa nhập email")
    }
    else{
    this.forgotPassService.confirm(confirmNumber).subscribe((data) => {
      this.checkConfirm=data;
      if(this.checkConfirm){
        this.router.navigate(['/changepassword']);
      }
      else {
        alert("Mã xác nhận không chính xác")
      this.router.navigate(['/confirm']);
      }
    },error=>(error));
  }
  }

}
