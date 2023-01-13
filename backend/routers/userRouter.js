import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../utils';
import data from '../data';
import { sign } from 'jsonwebtoken';
const bcrypt = require('bcrypt');


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
        //password: req.body.password
    });
    //compare password with encrypted saved password using bcrypt
    const correctPassword = await signinUser.comparePassword(req.body.password);
    if(!signinUser || correctPassword===false){
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

userRouter.post('/register', expressAsyncHandler(async (req,res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        lastOnline:Date().toLocaleString(),
        screen: "1440" + "x" + "1080",
        os: "Windows",
    });
    const createdUser = await user.save();
    if(!createdUser){
        res.status(401).send({
            message:'Invalid user data',
        });

    }
    else{
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdminL: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    }
}));

userRouter.put('/:id', isAuth, expressAsyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).send({
            message:'User not found',
        });

    }
    else{
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdminL: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

export default userRouter;