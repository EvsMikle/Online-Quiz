import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper-manage/paper.service';

@Component({
  selector: 'app-studentperformance',
  templateUrl: './studentperformance.component.html',
  styleUrls: ['./studentperformance.component.css']
})
export class StudentperformanceComponent implements OnInit {

  quizid!:number
  performances:any
  constructor(private authService:AuthService,private quizService:PaperService) { }

  ngOnInit(): void {
    const teacherDetails = this.authService.getuserTeacher();
    if(teacherDetails.user){
      this.quizService.getQuiz({teacherid:teacherDetails.user,subject:teacherDetails.subject}).subscribe((response:any)=>{
        if(response.status){
          this.quizid = response.result[0].QUIZID;
          this.quizService.getStudentPerformances({quizid:this.quizid}).subscribe((res:any)=>{
          if(res.status){
              this.performances = res.result;
              console.log(this.performances);
            }
          })
        }
      })
    }

  }

}
