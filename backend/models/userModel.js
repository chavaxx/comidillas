import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password:{type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    lastOnline: {type: String, required: true},
    screen: {type: String, required: false},
    os: {type: String, required: false},
});

const User = mongoose.model('User',userSchema);
export default User;