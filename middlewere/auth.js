
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
try{
const token=req.body.token;
console.log(token);
if(!token)
{ 
    return res.status(401).json({
        success:true,
        message:"token missing"
    })
}

//verify token

try
{
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    console.log(decode);
    req.user=decode;
}
catch(error)
{
    return res.status(401).json({
        success:false,
        message:"token is invalid"
    })
}
next();
}
catch(error)
{
    return res.status(403).json({
     success:false,
     message:"this is not valid user"   
    })

}
}
 exports.isStudent=(req,res,next)=>{
    try{

    if(req.user.role!=='Student')
    {
        return res.status(501).json({
            success:false,
            message:"this is procted route for student "
        });
    }
    next();
}
catch(error)
{
    return res.status(405).json({
        success:false,
        message:"user role is not matching"
    });
}}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=='Admin')
    {
        return res.status(501).json({
            success:false,
            message:"this is procted route for student "
        });
    }
    next();
}
catch(error)
{
    return res.status(405).json({
        success:false,
        message:"user role is not matching"
    });
    }}

