import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IdentityCommand} from "../models/IdentityCommand";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })

  }

  ngOnInit(): void {
  }


  submit(){
    console.log('submit');
    if (this.form.invalid) {
      return
    }

    const identityCommand: IdentityCommand = {
      login: this.form.value.login,
      password: this.form.value.password
    }

    this.authService.login(identityCommand).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/presentation'])
      //this.submitted = false
    }, () => {
      //this.submitted = false
      console.log('asca');
    })
  }

}
