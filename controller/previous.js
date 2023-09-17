const Saveurl = require('../model/saveurl')
exports.getPreviousDetails = async (req,res,next)=>{
    try {
        const response = await Saveurl.find({userId:req.user})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({success:false})
    }
}