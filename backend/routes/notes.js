const express = require('express');
const NotesModel = require('../models/Notes');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require ('express-validator');
router.get("/",(req,res)=>res.json({a:"ram"}));


//to get all the notes present on the database using GET: http://localhost:4000/api/notes/
router.get("/fetchallnotes",fetchuser,async(req,res)=>{
         
    try{
        const notesData = await Notes.find({user:req.user.id})
        res.status(200).json({success:true,data:notesData});
    }
    catch(error){
        console.log("error in fetching the notes Data ",error.message);
        res.status(500).json({success:false,message:"server error"})
    }

        
})

//to add notes into the database .login required
router.post("/addnote",[  body('title','enter a valid title').isLength({min:3}),
    body('description','enter a valid description').isLength({min:5})],fetchuser,async(req,res)=>{
            
        // const notesData = req.body;
        const {title,description,tag}=req.body;

       //if there are any errors in the validation then we will get this error
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
try {
    const notes = new Notes({
        title,description,tag,user:req.user.id
    });
    const savedNotes = await notes.save();
    res.status(200).json(savedNotes);
} catch (error) {
    res.status(400).json(error);
    console.log(error);
}

    // Notes.create(...notesData,user:req.user.id)
    // .then(()=>res.status(201).json({success:true,data:notesData}))
    // .catch((err)=>console.log(err));
})

// route to update a perticular note belong to the user who login 
//so to do this we need auth-token to get all the notes belong to the user and the notes id so that we can change that perticular notes

router.put("/updatenote/:id",fetchuser,async (req,res)=>{
        const {title,description,tag}= req.body;
     const newNote ={};
     //here we are updating the feilds only the user wants to change .
     if(title){newNote.title=title}
     if(description){newNote.description=description}
     if(tag)(newNote.tag=tag)

        let note =await Notes.findById(req.params.id);
        if(!note){
           return res.status(404).send("Not found");
        }
        if(note.user.toString() !==req.user.id){
           return res.status(401).send("Access denied");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,newNote,{new:true})
        res.json(note)
})
// Route:4 To delete a perticular note  http://localhost:4000/api/notes/deletenote/:id  (login required)
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
    try { 
    let note =await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not found");
    }
    if(note.user.toString() !==req.user.id){
       return res.status(401).send("Access denied");
    }

    deletedNote = await Notes.findByIdAndDelete(req.params.id)
    res.json(deletedNote)
} catch (error) {
    console.log(error.message);
    res.status(500).json("internal server error")
}
})
router.post("/allnotes/:id",async(req,res)=>{
       const {id} = req.params;
    try{
        
        const notes = await NotesModel.findById(id);
        res.status(200).json({status:true,data:notes})            
    }
    catch(error){
        console.log("error in fetching the notes Data ",error.message);
        res.status(500).json({status:false,message:"server error"}) 
    }
})

router.post("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedNotes = await NotesModel.findByIdAndDelete(id);
        res.status(200).json({success:true,data:deletedNotes});
    }
    catch(error){
        console.log("error in fetching the notes Data ",error.message);
        res.status(500).json({status:false,message:"server error"}) 
    }
})
router.post("/deleteall",async(req,res)=>{
  
    try{
        const deletedNotes = await NotesModel.deleteMany();
        res.status(200).json({success:true,data:deletedNotes});
    }
    catch(error){
        console.log("error in fetching the notes Data ",error.message);
        res.status(500).json({status:false,message:"server error"}) 
    }
})



module.exports = router;