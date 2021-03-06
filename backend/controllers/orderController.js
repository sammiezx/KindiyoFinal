const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

// Create new order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(201).json({
        success:true,
        order
    })
})

// get single order details
exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// get logged in user's order details
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{

    const orders = await Order.find({ user: req.user.id})

    if(!orders){
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(200).json({
        success:true,
        orders
    })
})

// get all orders --admin
exports.getAllOrders = catchAsyncErrors(async(req, res, next)=>{

    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })
    
    if(!orders){
        return next(new ErrorHandler("No Orders Yet", 404))
    }

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

// update order status --admin
exports.updateOrder = catchAsyncErrors(async(req, res, next)=>{

    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("No Orders Yet", 404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("The product has already been delivered", 400))
    }

    if(req.body.status === "Shipped")
    {
        order.orderItems.forEach( async(order)=>{
        await updateStock(order.product, order.quantity)
    })
}
    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
        order.paymentInfo.status = "paid"
        console.log(order.paymentInfo.status)
    }

    await order.save({ validateBeforeSave:false })
    res.status(200).json({
        success:true
    })
})

async function updateStock(id, quantity) {

    const product = await Product.findById(id)

    product.stock -= quantity
    await product.save({ validateBeforeSave:false })
    
}


// delete order--admin
exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("No Order like that", 404))
    }

    await order.remove()

    res.status(200).json({
        success:true
    })
})
