
const express=require('express');
const router=express.Router();
const{login}=require('../controllers/Auth')
const {signup}=require('../controllers/auth');
const {auth,isStudent,isAdmin}=require('../middlewere/auth');
router.post('/login',login);
router.post('/signup',signup,(req, res) => {
    res.json({
        success: true,
        message: "Student logged in successfully"
    });
});
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the portel"
    })
})
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Student logged in successfully"
    });
});

router.get('/admin',auth,isAdmin,(req, res) => {
    res.json({
        success: true,
        message: "Student logged in successfully"
    });
});
module.exports=router; 