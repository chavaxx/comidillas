import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils';
import data from '../data';


const userRouter = express.Router();
userRouter.get("/createadmin", expressAsyncHandler(async(req, res)=>{
    try{
        
        const user = new User({
            name:'admin',
            email:'admin@example.com',
            password: 'comidillas',
            isAdmin: true,
            lastOnline:Date().toLocaleString(),
            screen: "1440" + "x" + "1080",
            os: "Windows",
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch(err){
        res.status(500).send({message: err.message})
    }
}));

userRouter.post('/signin', expressAsyncHandler(async (req,res) =>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!signinUser){
        res.status(401).send({
            message:'Invalid Email or Password',
        });

    }
    else{
        //update the signIn Time
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdminL: signinUser.isAdmin,
            token: generateToken(signinUser),
            lastOnline: signinUser.lastOnline,
            screen: signinUser.screen,
        });
        //update date/time, os and screenSize
        signinUser.lastOnline = Date().toLocaleString();
        signinUser.screen = req.body.screen.toLocaleString();
        signinUser.os = req.body.os.toLocaleString();
        await signinUser.save();
    }
}));

export default userRouter;