const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./db");
const cors = require('cors')

connectToDB();

const app = express();

app.use(express.json());
app.use(cors())


app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

// app.post("/book",(req,res)=>{
//     const newbook=req.body;
//     Book.create(newbook)
//     .then(() => console.log('Books added successfully'))
//   .catch(err => console.error('Error adding books', err));
   
// })

app.listen(4000,(req,res)=>{
    console.log("server running on 4000");
    
})