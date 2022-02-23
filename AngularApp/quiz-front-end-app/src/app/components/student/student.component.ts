import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperService } from 'src/app/services/paper-manage/paper.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentName!:string
  quizzes:any
  currentQuiz = 1
  name = ""
  hide = false
  time:any
  constructor(private quizService:PaperService,
          private router:Router) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((res:any)=>{
        this.quizzes = res.result;
    })
  }

  changeQuiz(target:any){
    this.currentQuiz = target.selectedIndex+1;
  }
  submit(){
    if(this.currentQuiz && this.name){
      this.quizService.setStudent(this.currentQuiz,this.name);
      this.hide = true
      this.time = 6
      setInterval(()=>{
        if(this.time!="Best of luck!")
          this.time-=1
        if(this.time==0){
          this.time = "Best of luck!"
        }
      },1000);

      setTimeout(() => {
        clearInterval(); 
        this.router.navigate(['/quiz'],{replaceUrl:true});
      }, 7000);
      
    }
    else{
      alert('please fill all fields');
    }
  }

}
