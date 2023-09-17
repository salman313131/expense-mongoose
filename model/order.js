const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    paymentid:{
        type:String
    },
    orderid:{
        type:String
    },
    status:{
        type:String
    },
    userId:{
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    }
})

orderSchema.methods.update = function(paymentid,status){
    this.paymentid = paymentid
    this.status = status
    return this.save()
}
// const Sequelize = require('sequelize')
// const sequelize = require('../util/db')

// const Order = sequelize.define('order',{
//      id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

module.exports = mongoose.model('order',orderSchema)