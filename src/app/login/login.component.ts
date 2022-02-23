import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Auth } from '../model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  myForm: any;
  auth!: Auth;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  reactForm() {
    //console.log(this.myForm.value);
    this.loginService.getLoginAdmin()
      .subscribe(data => {
        this.auth = data;
        if (this.auth.token == "" || this.auth.type == "") {
          console.log('failed');
          //gestire con modale token vuoto e invalidazione
        } else if (this.auth.type == "admin") {
          // dirottamento pagina
          console.log('admin');
        } else if (this.auth.type == "user") {
          // dirottamento pagina
          console.log('user');
        }
      },
        _ => {
          console.log('FAILED REQUEST');
        });
  }

}
