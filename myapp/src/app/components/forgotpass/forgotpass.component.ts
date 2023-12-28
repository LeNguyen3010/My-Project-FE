import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/services/forgotpass.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  constructor(private forgotPassService:ForgotpassService,
    private router:Router) { }

  ngOnInit() {
  }
  confirmNumber:number;
  sendMail(email:string){
    this.forgotPassService.sendMail(email).subscribe((data) => {
        this.confirmNumber=data;
        if(!this.confirmNumber){
          alert("Gửi không thành công");
        }
        else{
          alert("Gửi thành công");
          localStorage.setItem("confirmemail",email);
          this.router.navigate(['/confirm']);
        }
    },error=>(error) => {
    });
  }



}
