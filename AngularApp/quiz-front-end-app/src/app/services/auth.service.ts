import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any
  teacherSub:any
  constructor(private http:HttpClient) { }

  //do not stringify the post data
  //always use subcribe method during api calls
  loginTeacher(data:any){
    return this.http.post("/api/teacherlogin",data);
  }
  signupTeacher(data:any){
    return this.http.post("/api/teachersignup",data);
  }
  
  setTeacher(id:string,sub:string){
    this.user = id
    this.teacherSub = sub 
  }

  getuserTeacher(){
    const res = {
      'user':this.user,
      'subject':this.teacherSub
    }
    return res;
  }
}
