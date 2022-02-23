import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-incharge',
  templateUrl: './incharge.component.html',
  styleUrls: ['./incharge.component.css']
})
export class InchargeComponent implements OnInit {
  teacherDetails!: {user:string,subject:string}
  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.teacherDetails = this.auth.getuserTeacher();
    //authentication check
    if(!this.teacherDetails.user){
      this.router.navigate(['inchargeLogin']);
    }
  }

}
