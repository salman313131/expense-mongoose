const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    ispremiumuser:{
        type: Boolean,
        default: false
    },
    totalExpense:{
        type:Number,
        default:0
    },
    totalSalary:{
        type:Number,
        default:0
    }
})

userSchema.methods.update = function(newExpenseData,newIncomeData){
        this.totalExpense+=newExpenseData
        this.totalSalary+=newIncomeData
        return this.save()
}
userSchema.methods.updateDelete = function(newExpenseData,newIncomeData){
        this.totalExpense=newExpenseData
        this.totalSalary=newIncomeData
        return this.save()
}
userSchema.methods.updatePremium = function(){
        this.ispremiumuser=true
        return this.save()
}


// const Sequelize = require('sequelize')
// const sequelize = require('../util/db')

// const User = sequelize.define('user',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         unique: true
//     },

//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     ispremiumuser: Sequelize.BOOLEAN,
//     totalExpense:{
//         type: Sequelize.INTEGER,
//         defaultValue : 0
//     },
//     totalSalary:{
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }
// })
module.exports = mongoose.model('user',userSchema)