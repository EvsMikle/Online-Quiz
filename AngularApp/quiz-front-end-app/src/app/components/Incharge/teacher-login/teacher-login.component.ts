import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  hide = true
  loginDetails = {username:'',password:''};
  signupDetails = {username:'',password:'',subject:''};
  click = false
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.click = true;
    if(!this.hide){
      if(this.loginDetails.username=='' || this.loginDetails.password==''){
        alert('Please fill details');
        return ;
      }
      this.authService.loginTeacher(this.loginDetails).subscribe((res:any)=>{
          if(res.status){
            this.authService.setTeacher(res.result[0].TEACHERID,res.result[0].SUBJECT);
            this.router.navigate(['/incharge']);
          }
          else{
            alert('Login Failed');
            this.click = false
          }
      })
    }
    else{
      if(this.signupDetails.username==''|| this.signupDetails.subject=='' || this.signupDetails.password==''){
        alert('Please fill details');
        return ;
      }
      this.authService.signupTeacher(this.signupDetails).subscribe((res:any)=>{
        if(res.status){
          console.log(res);
          this.authService.setTeacher(this.signupDetails.username,this.signupDetails.subject);
          this.router.navigate(['/incharge']);
        }
        else{
          alert('Login Failed');
          this.click = false
        }
      });
    }
  }
  loginpage(){
    this.click = false
    this.hide=false
  }
  signuppage(){
    this.click = false
    this.hide = true
  }
}
