const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    day:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    salary:{
        type:Number
    },
    spending:{
        type:Number
    },
    category:{
        type: String,
        required:true
    },
    userId:{
        type: Schema.ObjectId,
        require: true,
        ref: 'user'
    }
})
// const Sequelize = require('sequelize')
// const sequelize = require('../util/db')
// const Expense = sequelize.define('expense',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey: true,
//     },
//     day:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     date:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     month:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     year:{
//         type: Sequelize.INTEGER,
//         allowNull:false
//     },
//     salary:{
//         type: Sequelize.DOUBLE,
//         allowNull: true
//     },
//     spending:{
//         type: Sequelize.DOUBLE,
//         allowNull: true
//     },
//     category:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

module.exports = mongoose.model('expense',expenseSchema)