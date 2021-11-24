import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginAdmin = {
    username : "admin",
    email: "admin@gmail.com",
    password : "admin"

  }
  loginUser = {
    username : "user",
    email: "user@gmail.com",
    password : "user"

  }

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',Validators.required)

    })
  }
  onSubmit(){
    console.log(this.loginForm.value);

    if(JSON.stringify(this.loginForm.value) === JSON.stringify(this.loginAdmin)){
      console.log(" Admin Login successfully");
      localStorage.setItem("username",this.loginForm.value.username);
      localStorage.setItem("email",this.loginForm.value.email);
      localStorage.setItem("password",this.loginForm.value.password);
      this.authService.loginUser();
      this.authService.login();

    }
    else if(JSON.stringify(this.loginForm.value) === JSON.stringify(this.loginUser)){
      console.log(" User Login successfully");
      localStorage.setItem("username",this.loginForm.value.username);
      localStorage.setItem("email",this.loginForm.value.email);
      localStorage.setItem("password",this.loginForm.value.password);
      this.authService.loginUser();
      this.authService.login();
    }
    else{
      console.log("Login failed");
    }
  }

}
