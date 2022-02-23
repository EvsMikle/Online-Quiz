import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { TeacherLoginComponent } from './components/Incharge/teacher-login/teacher-login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InchargeComponent } from './components/Incharge/incharge/incharge.component';
import { PaperpatternComponent } from './components/Incharge/incharge/paperpattern/paperpattern.component';
import { AddquestionsComponent } from './components/Incharge/incharge/addquestions/addquestions.component';
import { StudentperformanceComponent } from './components/Incharge/incharge/studentperformance/studentperformance.component';
import { StudentComponent } from './components/student/student.component';
import { QuizComponent } from './components/student/quiz/quiz.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeacherLoginComponent,
    InchargeComponent,
    PaperpatternComponent,
    AddquestionsComponent,
    StudentperformanceComponent,
    StudentComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
