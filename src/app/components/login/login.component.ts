import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userSerice:UserService
              ,private userAuthService:UserAuthService
              ,private router: Router) { } 

  ngOnInit(): void {
  }
  login(loginForm:any){
    console.log(loginForm.value);
    this.userSerice.login(loginForm.value)
.subscribe (
  (response:any)=>{
    console.log(response);
    console.log(response.token);
    console.log(response.user.role);
    this.userAuthService.setRoles(response.user.role);
    this.userAuthService.setToken(response.token);

    const role = response.user.role[0].roleName;
        if (role === 'ADMIN') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      
  },
  (error)=>{
    // console.log(error); 
    this.router.navigate(['/forbidden']);
  }
);
 }

}
