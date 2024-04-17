const { response } = require('express');
const mongoose=require('mongoose');
const username=process.env.ATLAS_USERNAME;
const pw=process.env.ATLAS_PASSWORD;
const dbName=process.env.DB;
const uri = `mongodb+srv://${username}:${pw}@cluster0.xhhh8zf.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
.then(()=> {
    console.log('Mongoose Connected')
    })
    
.catch((error)=>console.log(`Error: `+error) )