import NotesItem from "./NotesItem";
import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/noteContext";
import { useNavigate } from "react-router-dom";
import Addnote from "./Addnote";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes,getNotes,editNote } = context;
    const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes()
    }
    else{
      navigate("/login");
    }
    
  }
  ,// eslint-disable-next-line
  []);
  const ref = useRef(null);
  const updateNote = (currentNote) => {
  
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    props.showAlert("Notes Updated","success"); 
    ref.current.click();
    
    
  };
  const [note, setNote] = useState({
    id:"",
    etitle: "title",
    edescription: "description",
    etag: "tag",
  });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handlesubmit = (e) => {
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        props.showAlert("Updated Successfully","success");
       
        
  };
  return (
    <> 
      <Addnote showAlert={props.showAlert}/>

      <button
        type="button"
        style={{ display: "none" }}
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="container my-5">
              <h1>Update the note</h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    name="etitle"
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="title"
                    value={note.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    name="edescription"
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    name="etag"
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handlesubmit} data-bs-dismiss="modal" type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        <div className="container text-danger">
        <h5>
        { notes.length===0 && "No notes are available!"}
        </h5>
         
        </div>
        {notes.map((note, index) => (
          <NotesItem showAlert={props.showAlert} key={note.index} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
