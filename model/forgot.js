const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgetSchema = new Schema({
    isactive:{
        type:Boolean
    },
    uuid:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.ObjectId,
        required:true,
        ref:'user'
    }
})

// const Sequelize = require('sequelize')
// const sequelize = require('../util/db')

// const Forgot = sequelize.define('forgotpasswordrequests',{
//     id:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         primaryKey:true,
//     },
//     isactive:{
//         type:Sequelize.BOOLEAN
//     }
// })

module.exports = mongoose.model('forgot',forgetSchema)