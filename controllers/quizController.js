// importing quizmodal for creating and getting quiz
const {quizModal}=require("../modals/quizModal")


// for quiz creation
const create=async(req,res)=>{
    let  {question,option,rightAnswer,startDate,endDate}=req.body;
          startDate=new Date(startDate).toISOString();
          endDate=new Date(endDate).toISOString();
    try {
        let result=new quizModal({question,option,rightAnswer,startDate,endDate})
        console.log(result)
        await result.save()
        res.status(200).json({"message":"Quiz created successfully"})
    } catch (error) {
        console.log(error)
        res.status(404).json({"message":"Gettng error while creating question"})
    }
}

const getActiveQuiz = async (req, res) => {
    try {
        const now = new Date();
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);

        const today = now.toISOString();  

        const result = await quizModal.find({
            startDate: { $lte: today },
            endDate: { $gte: today }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error finding active quiz:", error);
        res.status(404).json({ "message": "Unable to find active quiz" });
    }
};


const allQuiz=async(req,res)=>{
    try {
        const result=await quizModal.find();
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({"message":"Unable to find all quiz"})
    }
}

const getActiveQuizById=async(req,res)=>{
    const Id=req.params.id;
    try {
        const result=await quizModal.findOne({_id:Id});
        if(!result){
           return  res.status(404).json({"message":"Quiz not found"})
        }
        const now = new Date();
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        const today = now.toISOString();
        if(today<result.endDate){
           return  res.status(400).json({"message":"Quiz not ended"})
        }
       const data={
        correct:result.rightAnswer
       }

       res.status(200).json(data)
    } catch (error) {
        res.status(404).json({"message":"Quiz ended"})
    }
}

module.exports={create,getActiveQuiz,allQuiz,getActiveQuizById}