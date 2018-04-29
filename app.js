const path=require('path');
const express=require('express');
const app=express();

const bodyparser=require('body-parser');
const cors=require("cors");
const shorturl=require("./models/shorturl")
const mongoose=require("mongoose")
var router=require("./routes/route")
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cors());
const _=require('lodash');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://bittus:bittus@ds161529.mlab.com:61529/shorturls');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected successfully")
});

router(app,shorturl);

     
    app.listen(process.env.PORT||8083,()=>{
    	console.log("server is listening")
    })