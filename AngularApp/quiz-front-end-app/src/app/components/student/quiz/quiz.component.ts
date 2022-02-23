import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperService } from 'src/app/services/paper-manage/paper.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  hide = false
  result:any
  quizId!:number
  studentName!:string
  quizAnswers:any
  marksPerQuestion!:number
  totalTime!:number
  secRemaining = 60
  totalQuestions!:number
  subject!:string
  marksOptain = 0
  percentageOptain = 0
  nodejsTimeout:any
  feedbacktext!:string
  constructor(private quizService:PaperService,
            private router:Router) { }

  ngOnInit(): void {
    const temp = this.quizService.getStudent();
    this.quizId = temp.quizid;
    this.studentName =temp.studentname;

    if(this.studentName && this.quizId){
      let data = {
              quizid :this.quizId
            }
      this.quizService.getQuizbyNumber(data).subscribe((response:any)=>{
        if(response.status){
          this.totalQuestions = response.result[0].NOOFQUESTIONS;
          this.marksPerQuestion = response.result[0].MARKSPERQUESTION;
          this.totalTime = response.result[0].TIMEALLOCATED-1;
          this.subject = response.result[0].SUBJECT;
          this.quizAnswers = new Array<string>(response.result[0].TIMEALLOCATED);
        }
      })

        this.quizService.getQuestions(data).subscribe((response:any)=>{
          if(response.status){
            this.result = response.result;
            this.nodejsTimeout = setInterval(()=>{
              this.secRemaining-=1;
              if(this.secRemaining==0 && this.totalTime==0){
                  this.submit();
              }
              if(this.secRemaining==0 && this.totalTime>0){
                this.totalTime-=1;
                this.secRemaining = 60;
              }
            },1000);
          }
        })  
    }
    else{
        this.router.navigate(["/student"]);
    }
  }

  setAnswer(queNo:number,ans:string){
    this.quizAnswers[queNo] = ans;
  }
  submit(){

    this.hide = true;
    clearInterval(this.nodejsTimeout);
    for(let i = 0;i<this.totalQuestions;i++){
      if(this.quizAnswers[i] && this.quizAnswers[i]==this.result[i].CORRECTOPTION){
        this.marksOptain +=this.marksPerQuestion;  
      } 
    }

    this.percentageOptain = (this.marksOptain/(this.totalQuestions*this.marksPerQuestion))*100;
  
    this.quizService.getFeedback({grade:this.percentageOptain}).subscribe((response:any)=>{
      if(response.status && response.result.length){
        this.feedbacktext = response.result[0].FEEDBACKTEXT;
        console.log(this.feedbacktext);
      }
    })
    let data = {
      name : this.studentName,
      quizid : this.quizId,
      studentmarks : this.marksOptain,
      percentage : this.percentageOptain
    }
    this.quizService.addStudentPerformance(data).subscribe((Response:any)=>{
      if(Response.status){
        alert("Quiz Submitted Successfully");
      }
      else{
        alert("Error while saving your quiz");
      }
    })

  }
}
