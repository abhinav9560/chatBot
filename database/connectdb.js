const mongoose=require('mongoose')
const {ServerApiVersion} =require('mongodb')
const connectDB=(url)=>{

return mongoose.connect(url,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
})

}
module.exports=connectDB