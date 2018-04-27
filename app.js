const path=require('path');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require("cors");
const shorturl=require("./models/shorturl")
const mongoose=require("mongoose")
app.use(cors());
mongoose.connect('mongodb://localhost:27017/shortUrls');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected successfully")
});
app.route('/new/:shorturl(*)')
    .get(function(req, res) {
// res.sendFile(process.cwd() + '/views/index.html');
      let {shorturl}=req.params;
      const regex=new RegExp("http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*")
      var res=regex.test(shorturl)
      if(res)
        res.end("pass")
        else
          res.end("fail")


     })
     
    app.listen(process.env.PORT||8083,()=>{
    	console.log("server is listening")
    })