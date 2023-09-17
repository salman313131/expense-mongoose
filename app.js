//dotenv
require("dotenv").config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const expressWinston = require('express-winston')
const winston = require('winston')

//database
const mongoose = require('mongoose')

//Routers
const userRouter = require('./router/user')
const expenseRouter = require('./router/expense')
// const orderRouter = require('./router/purchase')
// const forgotRouter = require('./router/forgot')
// const saveurlRouter = require('./router/previous')
// const premiumRouter = require('./router/premium')

//Modal
const User = require('./model/user')
const Expense = require('./model/expense')
const Order = require('./model/order')
const Forgot = require('./model/forgot')
const Saveurl = require('./model/saveurl')

//file log
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
// app.use(helmet())
app.use(morgan('combined',{stream:accessLogStream}))

//api
app.use('/api/v1',userRouter)
// app.use('/api/v1',saveurlRouter)
app.use('/api/v1/expense',expenseRouter)
// app.use('/purchase',orderRouter)
// app.use('/',forgotRouter)
// app.use('/api/v1',premiumRouter)

//error-log
 app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json()
      )
    }));



//datbase sync
mongoose.connect('mongodb+srv://jaan:jaankhan786@nodereact.mu2wjrq.mongodb.net/ExpenseTracker?retryWrites=true&w=majority')
.then(()=>{
  app.listen(8000)
}).catch(err=>console.log(err))