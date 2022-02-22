import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {  }

  aa: any;

  ngOnInit(): void {
  }

  myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  reactForm() {
    console.log(this.myForm.value);
    console.log(this.myForm.value.username);

    this.getToken().subscribe(data => {
      this.aa = data;
      console.log(this.aa?.token);

      if (this.aa?.token == "") {
        console.log('failed');
      }
      else {
        console.log('ok');
      }
    });
    
  }

  getToken():Observable<String> {
    return this.http.get<String>("/assets/login.json");
  }

}
