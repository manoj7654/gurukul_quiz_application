// importing quizmodal for creating and getting quiz
const {quizModal}=require("../modals/quizModal")


// for quiz creation
const create=async(req,res)=>{
    const {question,option,startDate,endDate}=req.body
    try {
        let result=new quizModal({question,option,rightAnswer:option[0],startDate,endDate})
        result.save()
        res.staus(200).json({"message":"Questio created successfully"})
    } catch (error) {
        res.status(404).json({"message":"Gettng error while creating question"})
    }
}



module.exports={create}