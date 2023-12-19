const rateLimiter=require("express-rate-limit")

const limiter=rateLimiter({
    windowMs:60*1000,
    max:5,
    message:"You have exceeded your 5 request per minute",
    Headers:true
})

module.exports={limiter}