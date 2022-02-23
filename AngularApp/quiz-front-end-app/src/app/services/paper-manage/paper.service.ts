import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  private quizid!:number
  private studentName!:string
  constructor(private http:HttpClient) { }

  getQuizzes(){
    return this.http.get('/api/getAllQuizes');
  }
  //set paper pattern
  addQuiz(data:any){
    return this.http.post('/api/addQuiz',data);
  }
  getQuizbyNumber(data:any){
    return this.http.post('/api/getQuizbyId',data);
  }
  //get paper pattern for a subject with id of teacher
  getQuiz(data:any){
    return this.http.post('/api/getQuiz',data);
  }
  //set feedback for student performance
  addFeedback(data:any){
    return this.http.post('/api/addFeedback',data);
  }
  //get feedback for greater than and lesser than % of student performance
  getFeedback(data:any){
    return this.http.post('/api/getFeedback',data);
  }
  getFeedbacks(data:any){
    return this.http.post('/api/getFeedbacks',data);
  }
  //set question with quiz id
  addQuestion(data:any){
    return this.http.post('/api/addQuestion',data);
  }

  //get questions with respective subject teacher
  getQuestions(data:any){
    return this.http.post('/api/getQuestions',data);
  }

  //set student performance 
  addStudentPerformance(data:any){
    return this.http.post('/api/addPerformance',data);
  }
  //get student performance
  getStudentPerformances(data:any){
    return this.http.post('/api/getPerformances',data);
  }

  setStudent(id:number,name:string){
    this.quizid = id
    this.studentName = name
  }
  getStudent(){
    return {quizid:this.quizid,studentname:this.studentName};
  }
}
