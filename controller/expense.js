const Expense = require('../model/expense')
const Saveurl = require('../model/saveurl')
const User = require('../model/user')
const AWS = require('aws-sdk')

function uploadToS3(data,filename){
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_USER_KEY,
        secretAccessKey : process.env.AWS_USER_SECRET
    })
    var params={
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve,reject)=>{

        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                reject(error)
            }
            else{
                resolve(s3response.Location)
            }
        })
    })
}

exports.downloadFiles= async(req,res,next)=>{
    try {
        const expenses = await Expense.find({userId:req.user})
        const stringifyExpenses = JSON.stringify(expenses)
        const filename = `expenses${req.user.id}/${new Date()}.txt`
        const fileUrl = await uploadToS3(stringifyExpenses,filename)
        const saveurl = new Saveurl({url:fileUrl,userId:req.user})
        await saveurl.save()
        res.status(200).json({fileUrl,success:true})
    } catch (error) {
        res.status(500).json({error,message:'failed'})
    }
}

exports.getAllDetails=(async (req,res,next)=>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page-1)*limit
    const endIndex = page*limit
    try {
        const result = await Expense.find({userId:req.user})
        const finalresult = {}
        if(endIndex<result.length){

            finalresult.next = {page:page+1,limit:limit}
        }
        if(startIndex>0){

            finalresult.previous = {page:page-1,limit:limit}
        }
        finalresult.users = result.slice(startIndex,endIndex)
        res.status(200).json({finalresult,ispremium:req.user.ispremiumuser})
    } catch (error) {
        res.status(500).json(error)
    }
})
exports.getDetail = (async (req,res,next)=>{
    try {
        const response = await Expense.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({success:false,error})
    }
})
exports.postDetails = (async(req,res,next)=>{
    try {
        const jsonData = req.body
        const newExpenseData = Number(jsonData.spending)+Number(req.user.totalExpense)
        const newIncomeData = Number(jsonData.salary)+Number(req.user.totalSalary)
        await req.user.update(newExpenseData, newIncomeData);
        const addExpense = new Expense({day: jsonData.day,date: jsonData.date,month: jsonData.month,year: jsonData.year,salary: jsonData.salary,spending: jsonData.spending,category: jsonData.category,userId:req.user})
        const result = await addExpense.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
exports.deleteUser = (async (req,res,next)=>{
    try {
        const userId = req.params.userId
        const deleteUserDetail = await Expense.findOne({_id:userId})
        const newSpendingData = Number(req.user.totalExpense)-Number(deleteUserDetail.spending)
        const newSalaryData = Number(req.user.totalSalary)-Number(deleteUserDetail.salary)
        await req.user.updateDelete(newSpendingData,newSalaryData)
        const result = await Expense.deleteOne({_id:userId})
        res.status(204).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})