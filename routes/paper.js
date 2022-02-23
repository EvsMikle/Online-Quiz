var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var cred  = require('./../credential.json');
var connection = mysql.createConnection(
  {
    user:cred.db.username,
    password:cred.db.password,
    host:cred.db.host,
    database:cred.db.database
  }
)

router.post('/addQuiz',(req,res,next)=>{
    try{
                connection.query("CREATE TABLE IF NOT EXISTS QUIZTABLE(QUIZID INT AUTO_INCREMENT PRIMARY KEY,TEACHERID VARCHAR(50),SUBJECT VARCHAR(50),NOOFQUESTIONS INT,MARKSPERQUESTION FLOAT,TIMEALLOCATED INT,FEEDBACKID VARCHAR(100));");
                const _query = "INSERT INTO QUIZTABLE(TEACHERID,SUBJECT,NOOFQUESTIONS,MARKSPERQUESTION,TIMEALLOCATED,FEEDBACKID)"+
                "VALUES('"+req.body.teacherid+"','"+req.body.subject+"',"+req.body.noofquestions+","+req.body.marksperquestions+","+req.body.timeallocated+",'"+(req.body.teacherid+req.body.subject)+"')";

                connection.query(_query,(err, result, field)=>{
                    
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post('/getQuiz',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM QUIZTABLE WHERE TEACHERID='"+req.body.teacherid+"' and SUBJECT='"+req.body.subject+"';";
                connection.query(_query,(err, result, field)=>{
                    
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post('/getQuizbyId',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM QUIZTABLE WHERE QUIZID="+req.body.quizid +";";
                connection.query(_query,(err, result, field)=>{
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})


router.get('/getAllQuizes',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM QUIZTABLE";
                connection.query(_query,(err, result, field)=>{
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post("/addQuestion",(req,res,next)=>{
    try{
                connection.query("CREATE TABLE IF NOT EXISTS QUESTIONTABLE(QUESTIONID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,"
                + "QUESTIONTEXT VARCHAR(1000),QUESTIONIMAGE LONGTEXT,QUIZID INT,CORRECTOPTION VARCHAR(200),OPTION1 VARCHAR(200),OPTION2 VARCHAR(200),OPTION3 VARCHAR(200),OPTION4 VARCHAR(200));");
                const _query = "INSERT INTO QUESTIONTABLE(QUESTIONTEXT,QUESTIONIMAGE,QUIZID,CORRECTOPTION,OPTION1,OPTION2,OPTION3,OPTION4)"+
                "VALUES('"+req.body.questiontext+"','"+req.body.questionimage+"',"+req.body.quizid+",'"+req.body.correctoption+"','"+req.body.option1+"','"+req.body.option2+"','"+req.body.option3+"','"+req.body.option4+"')";
               
                connection.query(_query,(err, result, field)=>{       
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                });
            
    }
    catch(err){ console.log("conneciton failed"); }
})



router.post('/getQuestions',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM QUESTIONTABLE WHERE QUIZID="+req.body.quizid+";";
                connection.query(_query,(err, result, field)=>{
                    
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})


router.post('/addPerformance',(req,res,next)=>{
    try{    
                connection.query("CREATE TABLE IF NOT EXISTS STUDENTPERFORMANCE(PERFORMANCEID INT PRIMARY KEY AUTO_INCREMENT,NAME VARCHAR(100),QUIZID INT,STUDENTMARKS FLOAT,PERCENTAGE INT);");
                const _query = "INSERT INTO STUDENTPERFORMANCE(NAME,QUIZID,STUDENTMARKS,PERCENTAGE)"+
                "VALUES('"+req.body.name+"',"+req.body.quizid+","+req.body.studentmarks+","+req.body.percentage+");";
                connection.query(_query,(err, result, field)=>{
                    
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post('/getPerformances',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM STUDENTPERFORMANCE WHERE QUIZID="+req.body.quizid+";";
                connection.query(_query,(err, result, field)=>{
                    
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})


router.post('/addFeedback',(req,res,next)=>{
    try{
                connection.query("CREATE TABLE IF NOT EXISTS FEEDBACKTABLE(FEEDBACKCOUNT INT NOT NULL PRIMARY KEY AUTO_INCREMENT,FEEDBACKID VARCHAR(100),FEEDBACKTEXT VARCHAR(100),MINGRADE INT,MAXGRADE INT);");
                const _query = "INSERT INTO FEEDBACKTABLE(FEEDBACKID,FEEDBACKTEXT,MINGRADE,MAXGRADE)"+
                "VALUES('"+req.body.feedbackid+"','"+req.body.feedbacktext+"',"+req.body.mingrade+","+req.body.maxgrade+");";
                connection.query(_query,(err, result, field)=>{   
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post('/getFeedback',(req,res,next)=>{
    try{    
                const _query = "SELECT * FROM FEEDBACKTABLE WHERE mingrade<="+req.body.grade+" and maxgrade>="+req.body.grade+";";
                connection.query(_query,(err, result, field)=>{   
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

router.post('/getFeedbacks',(req,res,next)=>{
    try{
                const _query = "SELECT * FROM FEEDBACKTABLE WHERE FEEDBACKID='"+req.body.feedbackid+"';";
                connection.query(_query,(err, result, field)=>{   
                    if(!err){
                        res.json({
                        'status':true,
                        'result':result,
                        'field':field
                        });
                    }
                    else{
                        console.log(err);
                        res.json({
                            'status':false
                        });
                    }
                }); 
            
    }
    catch(err){ console.log("conneciton failed"); }
})

module.exports = router;

