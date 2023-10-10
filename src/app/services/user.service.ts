import { EventEmitter, Injectable } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }
  inValidUser = new EventEmitter<boolean>(false)
  userSignup(user:SignUp){
    console.log(user);
    this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
      console.log("result",result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data:LogIn){
    this.http
    .get<SignUp[]>(
      `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
        this.inValidUser.emit(false);
      }else{
        this.inValidUser.emit(true)
      }
    })
  }
}
