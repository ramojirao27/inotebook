const mongoose = require("mongoose");
//to read the .env file and configure it
require('dotenv').config();

//to get the data from the .env file stored in MONGODB_URL Variable
const url =process.env.MONGODB_URL ||"mongodb://localhost:27017/inotebook";

// const url ="mongodb://localhost:27017/inotebook";
function connectToDB (){
    mongoose.connect(url)
.then(()=>console.log(" mongodb connection established"))
.catch((error)=>console.log(error));
}

module.exports = connectToDB;