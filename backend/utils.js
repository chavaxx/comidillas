import config from "./config"
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer';

export const generateToken = (user) =>{
    return jwt.sign(
    {
        _id: user._id, 
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    config.JWT_SECRET
    );
};

export const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({message: 'Token is not supplied'});
    } else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({message: 'Invalid token'});
            } else {
                req.user = data;
                next();
            }
        });
    }
};

export const sendPassword = (email, password) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'comidillaswebprogramming@gmail.com',
            pass: 'kcuzcltlimhyhrxu',
        },
    });

    const mailOptions = {
        from: 'comidillaswebprogramming@gmail.com',
        to: email,
        subject: 'Register password',
        text: `Your register password is: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Correo electronico enviado");
        }
    });
};

