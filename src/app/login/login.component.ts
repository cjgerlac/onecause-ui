import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

class Login {
  username?: string;
  password?: string;
  token?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  unauthorized = false;
  authorized = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    token: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  loginUser() {
    const creds: Login = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      token: this.loginForm.get('token')?.value
    }

    this.http.post("http://localhost:4201/loginOne", creds).subscribe({
      next: () => {
        this.unauthorized = false;
        this.authorized = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.unauthorized = true;
          this.authorized = false;
        }
      }
    });
  }

  ngOnInit(): void { }

}
