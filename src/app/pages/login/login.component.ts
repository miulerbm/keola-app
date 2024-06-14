import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http
      .post('https://inclubtest.com:2053/api/token', this.loginObj)
      .subscribe((res: any) => {
        if (res) {
          alert('Inicio de sesión correcto!');
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Credenciales incorrectas');
        }
      });
  }
}

export class Login {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
}
