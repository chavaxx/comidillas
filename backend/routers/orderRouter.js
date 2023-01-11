import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from '../utils.js'


const orderRouter = express.Router();

orderRouter.post(
    '/', 
    isAuth, 
    expressAsyncHandler(async(req, res) => {
        const order = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New order created', order: createdOrder});
    })
    );

export default orderRouter;