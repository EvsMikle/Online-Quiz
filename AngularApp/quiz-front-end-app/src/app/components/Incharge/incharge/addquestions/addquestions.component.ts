import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper-manage/paper.service';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  quizId !:number 
  questiontext:any
  questionimage:any
  correctoption:any
  optionarr = ["","","",""]
  result:any
  imagetype!:any
  teacherDetails:any
  constructor(private quizService:PaperService,private authservice:AuthService) { }

  ngOnInit(): void {
    this.teacherDetails = this.authservice.getuserTeacher();
    if(this.teacherDetails.user){
      this.quizService.getQuiz({teacherid:this.teacherDetails.user,subject:this.teacherDetails.subject}).subscribe((response:any)=>{
        if(response.status){
          this.quizId = response.result[0].QUIZID
          this.refresh()
        }
      })
    }    
  }
  changeCorrect(event:any){
    this.correctoption = this.optionarr[event.target.selectedIndex];
  } 
  changeImage(event:any){
    if(!event.target.files[0] || event.target.files[0].lenght==0 ){
      alert("Please select file");
      return;
    }
    const mimetype = event.target.files[0].type;
    if(mimetype.match(/image\/*/) == null){
      alert("please select image file");
      return;
    }
    this.imagetype = mimetype;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload  = (error)=>{
      this.questionimage = reader.result;
    }
  }
  submit(){
    if(this.questiontext &&this.correctoption&& this.quizId){
      const data = {
        questiontext:this.questiontext,
        questionimage:this.questionimage,
        quizid :this.quizId,
        correctoption:this.correctoption,
        option1:this.optionarr[0],
        option2:this.optionarr[1],
        option3:this.optionarr[2],
        option4:this.optionarr[3]
      }
      this.quizService.addQuestion(data).subscribe((response:any)=>{
        if(response.status){
          alert("Question submitted");
          this.questionimage = ""
          this.questiontext = ""
          this.optionarr = []
          this.correctoption = ""
          this.refresh()
        }
        else{
          alert("submission failed")
        }
      })
    }
    else{
      alert("Submit all fields before submission");
    }
  }

  refresh(){

    const data = {
      quizid:this.quizId
    }
    if(this.quizId){
      this.quizService.getQuestions(data).subscribe((response:any)=>{
        this.result = response.result;
      })
    }
    
  }
}
