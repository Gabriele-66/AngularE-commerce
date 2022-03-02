import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Auth } from '../model/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: any;
  auth!: Auth;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  reactForm() {
    //console.log(this.myForm.value);
    this.submitted = true;
    this.loginService.getLoginAdmin().subscribe(
      (data) => {
        this.auth = data;
        if (this.auth.token == '' || this.auth.type == '') {
          console.log('failed');
        } else if (this.auth.type == 'admin') {
          this.router.navigate(['disambiguation']);
          console.log('admin');
        } else if (this.auth.type == 'user') {
          this.router.navigate(['user']);
          console.log('user');
        }
      },
      (_) => {
        console.log('FAILED REQUEST');
      }
    );
  }
}
