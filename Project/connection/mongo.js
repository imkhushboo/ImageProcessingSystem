const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async() =>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB".bgYellow);
    }
    catch(err)
    {
        console.log("ERROR IN DB", err, colors.bgRed)
    }
}
module.exports = connectDb;