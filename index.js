const express=require('express');
const  app=express();
require('dotenv').config();

const PORT=4000;
app.use(express.json());


app.listen(PORT,(req,res)=>{
    console.log("server has started");
});
require('./config/database').dbconnnect();
const user=require('./routes/user');
app.use('/api/v1',user);
app.get('/',(req,res)=>{
    res.send("hello backend");
});