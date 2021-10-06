const express = require('express')
const app=express()
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')

//creating our database
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'nlip1100',
    database:'movie'
})
app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())

//check error in connection
db.connect((err)=> {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });

app.get('/api/get', (req, res)=>{
    const sqlSelect ="SELECT * from movie_review"
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
})
app.post('/api/insert', (req, res)=>{

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    //sql query
   const sqlInsert="INSERT into movie_review(movieName, movieReview)Values (?, ?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
        if(err) throw err
        
    })
   
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started om port ${PORT}`))