import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../utils';


const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler(async(req, res)=>{
    try{
        const user = new User({
            name:'admin',
            email:'admin@example.com',
            password: 'comidillas',
            isAdmin: true,
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
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdminL: signinUser.isAdmin,
            token: generateToken(signinUser),
        });
    }
}));

userRouter.post('/register', expressAsyncHandler(async (req,res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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