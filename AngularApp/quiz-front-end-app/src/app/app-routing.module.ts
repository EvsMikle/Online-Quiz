import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddquestionsComponent } from './components/Incharge/incharge/addquestions/addquestions.component';
import { InchargeComponent } from './components/Incharge/incharge/incharge.component';
import { PaperpatternComponent } from './components/Incharge/incharge/paperpattern/paperpattern.component';
import { StudentperformanceComponent } from './components/Incharge/incharge/studentperformance/studentperformance.component';
import { TeacherLoginComponent } from './components/Incharge/teacher-login/teacher-login.component';
import { QuizComponent } from './components/student/quiz/quiz.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'student',component:StudentComponent},
  {path:'quiz',component:QuizComponent},
  {path:'inchargeLogin',component:TeacherLoginComponent},
  {path:'incharge',component:InchargeComponent,children:[
    {path:'',component:PaperpatternComponent},
    {path:'setpaperpattern',component:PaperpatternComponent},
    {path:'addquestions',component:AddquestionsComponent},
    {path:'studentperformance',component:StudentperformanceComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
