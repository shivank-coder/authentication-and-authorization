const bcrypt=require('bcrypt');
const User=require('../model/User');

const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        const existUser=await User.find({email});
        if(existUser.length>0)
        {
            return res.status(400).json({
                success:false,
                message:"user already exist",

            });
            
        }
        let haspassword;
        try{
            haspassword=await bcrypt.hash(password,10);

        }
catch(err){
    return res.status(500).json({
        success:false,
        message:"eroro while enciption of password ",
    })

};
const user=await User.create({name,email,password,role});
res.status(200).json({
    success:true,
    data:user,
    message:"user created  successfully",
});

}
catch(error){

    return res.status(500).json({
        success:false,
        message:"user can't be ragister please try again later",
    });


    }

}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        const user = await User.findOne({ email });
        console.log(user);
        console.log(user.password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
//         console.log(user.password);
// const passwordMatch = await bcrypt.compare(password, user.password)
        if (password==user.password) {
            // Passwords match, create a JWT token and set cookies
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            

            // Set cookie with JWT token
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options);

            // Remove sensitive data from user object before sending in response
            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
            });
        }
        
        else {
            return res.status(403).json({
                success: false,
                message: "Invalid password",
            });
        }
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

