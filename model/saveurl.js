const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saveurlSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    }
})
// const Sequelize = require('sequelize')
// const sequelize = require('../util/db')

// const Saveurl = sequelize.define('saveurl',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     url:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     }
// })

module.exports = mongoose.model('saveurl',saveurlSchema)