
const express=require('express');
const app=express();

const bodyparser=require('body-parser');
const cors=require("cors");
const mongoose=require("mongoose")
const _=require('lodash');

module.exports=function(app,shorturl){

  app.get('/',(req,res)=>{
    res.send("Please add /new/your_Url to generate short url")
  })

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
  }