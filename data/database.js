import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName:"API",
    })
    .then((c)=>console.log(`Database conected ${c.connection.host}`))
    .catch((e) => console.log(e));
}