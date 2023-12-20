const cron=require("node-cron");
 
const {quizModal}=require("../modals/quizModal")

const scheduler=async()=>{

    try {
        const quizzes=await quizModal.find();
        const now = new Date();
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
    
        const today = now.toISOString();  
    
    
        quizzes.forEach(async(item)=>{
            if(today>=item.startDate && today<=item.endDate){
                item.status="active"
            }else if(today>item.endDate){
                item.status="finished"
            }else{
                item.status="inactive"
            }
            await item.save();
        })
        console.log("Quiz status updated successfully")
    
    } catch (error) {
        console.log(error)
    }
  
}
// scheduling jobs
cron.schedule('*/5  * * * *',scheduler)


module.exports={scheduler}