import React,{useContext, useState} from 'react'
import noteContext from "../context/noteContext";
const Addnote = (props) => {
    
    const context = useContext(noteContext)
   const {addNote} = context;

   const [newNote,setNewnote] = useState({
    title:"",
    description:"",
    tag:"default"
   })
   const handleChange =(e)=>
    { 
        setNewnote({...newNote,[e.target.name]:e.target.value})
    }
   const handlesubmit =(e)=>{
        e.preventDefault()
     
     addNote(newNote);
     props.showAlert("Note Added","success");
     setNewnote({
      title:"",
      description:"",
      tag:"default"
     })
   }
   
  
  return (
    <div className="container my-5">
      <h1>Add a note</h1>
      <form onSubmit={handlesubmit} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            value={newNote.title}
            onChange={handleChange}
            minLength={5} 
            required={true}                    />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            name='description'
            type="text"
            className="form-control"
            id="description"
            minLength={5} 
            required={true} 
            value={newNote.description}
            onChange={handleChange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            name="tag"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={newNote.tag}
            onChange={handleChange}
          />
        </div>
        <button  className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Addnote