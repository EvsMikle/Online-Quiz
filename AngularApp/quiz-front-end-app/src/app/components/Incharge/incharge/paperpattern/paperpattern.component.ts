import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper-manage/paper.service';

@Component({
  selector: 'app-paperpattern',
  templateUrl: './paperpattern.component.html',
  styleUrls: ['./paperpattern.component.css']
})
export class PaperpatternComponent implements OnInit {

  pattern = {noofques:0,marksperque:0,timeallocated:0};
  totalFeedback = 0
  feedbacks:{feedbacktext:string,mingrade:number,maxgrade:number}[] = []
  feedbacktext = ''
  mingrade = 0
  maxgrade = 0
  quizId:any
  teacherDetails:any
  click = false
  constructor(private quizService:PaperService,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.teacherDetails = this.authservice.getuserTeacher();
    if(this.teacherDetails.user){
      this.quizService.getQuiz({teacherid:this.teacherDetails.user,subject:this.teacherDetails.subject}).subscribe((response:any)=>{
        if(response.status){
          this.pattern.noofques = response.result[0].NOOFQUESTIONS;
          this.pattern.marksperque = response.result[0].MARKSPERQUESTION;
          this.pattern.timeallocated = response.result[0].TIMEALLOCATED;
          this.quizId = response.result[0].QUIZID;

        }
      })

      this.quizService.getFeedbacks({feedbackid:this.teacherDetails.user+this.teacherDetails.subject}).subscribe((Response:any)=>{
        if(Response.status){
          for(let res of Response.result){
            this.feedbacks.push({feedbacktext:res.FEEDBACKTEXT,mingrade:res.MINGRADE,maxgrade:res.MAXGRADE});
          }
        }
      })
    }
  }

  submit(){
    
    if(this.pattern && this.feedbacks){
      this.click = true
      const data = {
        teacherid:this.teacherDetails.user,
        subject:this.teacherDetails.subject,
        noofquestions:this.pattern.noofques,
        marksperquestions:this.pattern.marksperque,
        timeallocated:this.pattern.timeallocated
      }
      this.quizService.addQuiz(data).subscribe((response:any)=>{
        if(!response['status'])
        {
          alert('Submission failed!');
          this.click = false
        }
        else{
          alert('Data submitted! Please add questions');
          //response quizid

        }
      })
    }
    else alert("Please fill all fields before submit");
  }

  addFeedback(){
    if(this.feedbacktext){
      const data = {
        feedbackid : this.teacherDetails.user+this.teacherDetails.subject,
        feedbacktext: this.feedbacktext,
        mingrade:this.mingrade,
        maxgrade:this.maxgrade
      }
      this.quizService.addFeedback(data).subscribe( (Response:any)=>{
        if(Response['status']){
          this.feedbacks.push({feedbacktext:this.feedbacktext,mingrade:this.mingrade,maxgrade:this.maxgrade});
        }
        else{
          alert('Data submission failed!');
        }
      })
    }
    else{
      alert("Please fill all fields before submit")
    }
  }
}
