const Razorpay = require('razorpay')
const Order = require('../model/order')
const {RAZORPAY_KEY_ID,RAZORPAY_KEY_SECRET} = process.env
exports.purchasePremium =  async (req,res,next)=>{
    try {
        var rzp = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        })
        const amount = 2500
        const order = await rzp.orders.create({ amount, currency: 'INR' })
        const result = new Order({ orderid: order.id, status: 'PENDING', userId: req.user})
        await result.save()
        return res.json({ order, key_id: rzp.key_id });
    } catch (error) {
        res.status(500).json({message:'controller Error'})
    }
}

exports.purchaseUpdate = async (req,res,next)=>{
    try{
        const {payment_id,order_id} = req.body
        const order = await Order.findOne({orderid:order_id})
        await req.user.updatePremium()
        await order.update(payment_id,'SUCCESS')
        res.status(202).json({success:true,message:'Transaction completed!!'})
    } catch(error){
        res.status(403).json({err:error,message:'Something went Wrong'})
    }
}