import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { ForgotpassService } from "src/app/services/forgotpass.service";

@Component({
  selector: "app-changepass",
  templateUrl: "./changepass.component.html",
  styleUrls: ["./changepass.component.css"],
})
export class ChangepassComponent implements OnInit {
  constructor(
    private forgotPassService: ForgotpassService,
    private router: Router
  ) {}

  ngOnInit() {}

  user: User;
  password: string = "";
  confirmpassword: string = "";

  changePass() {
    console.log(this.password + this.confirmpassword);
    if (!this.password || !this.confirmpassword) {
      alert("Không được bỏ trống ");
    } else if (this.password === this.confirmpassword) {
      this.forgotPassService
        .findUserByEmail(localStorage.getItem("confirmemail"))
        .subscribe((result) => {
          this.user = result;
          console.log(this.user);
          this.user.password = this.password;
          this.forgotPassService
            .changePassword(this.user)
            .subscribe((result) => {
              localStorage.removeItem("confirmemail");
              this.router.navigate(["/login"]);
            });
        });
    } else {
      alert("Mật khẩu không trùng nhau");
    }
  }
}
