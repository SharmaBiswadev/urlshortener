const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const urlschema=new Schema({
	originalUrl:String,
	shorturl:String
},{
	timestamps:true
});

const model=mongoose.model('shortUrl',urlschema);

module.exports=model;