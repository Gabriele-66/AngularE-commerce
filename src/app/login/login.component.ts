import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Auth } from '../model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService) {  }

  auth!: Auth;

  ngOnInit(): void {
  }

  myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  reactForm() {
    console.log(this.myForm.value);

    this.loginService.getLoginFailed().subscribe(data => {
      this.auth = data;
      if (this.auth.token == "" || this.auth.type == "") {
         console.log('failed');
       }
       else if(this.auth.type == "admin"){
         console.log('admin');
       }else if(this.auth.type == "user"){
         console.log('user');
       }
    });
  }

}
