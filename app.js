const path=require('path');
const express=require('express');
const app=express();
var favicon = require('serve-favicon')
const bodyparser=require('body-parser');
const cors=require("cors");
const shorturl=require("./models/shorturl")
const mongoose=require("mongoose")
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

app.get('/favicon.ico', (req, res) => 
  {
    console.log("favicon")
    res.status(204)});
app.route('/new/:url(*)')
    .get(function(req, res) {
// res.sendFile(process.cwd() + '/views/index.html');
      let {url}=req.params;
      const regex=new RegExp(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/i);
      var matched=regex.test(url)
      var short;
      console.log(matched,url)
        if(matched){
          short=Math.floor(Math.random()*100000).toString();
          var data=new shorturl({
            originalUrl: url,
            shorturl:short
          })
          data.save((err)=>{
           return res.end("Error in saving to database");
          })
           res.status(200).send(_.pick(data,['originalUrl','shorturl']));
}else{
         data=new shorturl({
            originalUrl: "urltoshorten doesnot match standard pattern",
            shorturl:"Invalid Url"
          });
           res.json(data);
        }
     });
     
     app.route('/:urltoforward')
    .get(function(req, res) {
      let {urltoforward}=req.params;
      console.log(urltoforward);
// res.sendFile(process.cwd() + '/views/index.html');
     shorturl.findOne({shorturl:urltoforward},(err,data)=>{
      
      if(err){
        res.end("Error connecting to database")
      }
      let url=data.originalUrl;
      let regex=new RegExp("^(https||http)://","i")
       if(regex.test(url)){
        res.redirect(301,url)
       }else{
        res.redirect(301,"http://"+data.shorturl)
       }
     })
     })
     
    app.listen(process.env.PORT||8083,()=>{
    	console.log("server is listening")
    })