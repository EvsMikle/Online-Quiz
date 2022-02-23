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

router.post('/teacherlogin', function(req, res, next) {
    
  try{
            const _query = "SELECT * FROM TEACHERLIST WHERE TEACHERID='"+req.body.username+"' AND PASSWORD='"+req.body.password+"';";
           
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
catch(err){
    
    console.log("conneciton failed");
}
});

router.post('/teachersignup',function(req,res,next){
  try{
            connection.query("CREATE TABLE IF NOT EXISTS TEACHERLIST(TEACHERID VARCHAR(50) NOT NULL,PASSWORD varchar(50) NOT NULL,SUBJECT varchar(50) NOT NULL, PRIMARY KEY (TEACHERID, SUBJECT));");
            const _query = "INSERT INTO TEACHERLIST VALUES('"+req.body.username+"','"+req.body.password+"','"+req.body.subject+"');";
            
            connection.query(_query,(err, result, field)=>{
                if(!err){
                    res.json({
                    'status':true,
                    'result':result,
                    'field':field
                    });
                }
                else{
                    res.json({
                        'status':false
                    });
                }
            });
}
catch(err){
    console.log("conneciton failed");
}
})
module.exports = router;
