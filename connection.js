const mysql = require('mysql2');
var mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'root',
    database: 'TASK'
})

 mysqlconnection.connect((err)=>{
    if(err){
        console.log('Error in DB connection'+JSON.stringify(err,undefined,2))
    }else{
        console.log('DB connected success')
    }
})

module.exports= mysqlconnection