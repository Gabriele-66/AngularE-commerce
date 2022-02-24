import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice-page',
  templateUrl: './choice-page.component.html',
  styleUrls: ['./choice-page.component.css']
})
export class ChoicePageComponent implements OnInit {
  userForm: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      userType: ['admin', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['login']);
  }

  next() {
    console.log(this.userForm.controls.userType.value);
    if (this.userForm.controls.userType.value === 'admin')
      this.router.navigate(['admin']);
    else if (this.userForm.controls.userType.value === 'user')
      this.router.navigate(['user']);
  }
}
