import React,{useContext, useState} from "react";
import NoteContext from "../context/noteContext";
const NotesItem = (props) => {
  
  const {note,updateNote} = props;

  
  // const { key,note } = props;
  const context = useContext(NoteContext);
  const {deleteNote} = context;

 
  return (
    <div className="col-md-3">
      <div className="card ">
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className="card-text">
            {note.tag}
          </p>
          <div className="icon d-flex ">
        
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success");}} ></i>
             <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)} ></i>
            

          </div>
          
          
          {/* <i class="fa-solid fa-right-to-bracket"></i>
          <i class="fa-solid fa-user-plus"></i> */}
        
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
