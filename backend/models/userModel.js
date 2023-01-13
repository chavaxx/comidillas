import mongoose from "mongoose";
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password:{type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    lastOnline: {type: String, required: false},
    screen: {type: String, required: false},
    os: {type: String, required: false},
});

//function to hash password before saving into database

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err);

            this.password = hash;
            next();
        });
    } else{
        next();
    }
    
});

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing, cannot compare hashes!');

    try{
        const result = await bcrypt.compare(password, this.password);
        return result;

    }
    catch (error){
        console.log('Error while comparing passwords! ', error.message);
    }
}

const User = mongoose.model('User',userSchema);
export default User;