import { useState } from "react";
import NoteContext from "./noteContext";
// import Alert from "../Components/Alert";

const NoteState = (props) => {
  const host = "http://localhost:4000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //GET ALL THE NOTES

  //function to add a new note
  const getNotes = async () => {
    //API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZmRlODU0ODJhOTkzNDI3MTc5MjczIn0sImlhdCI6MTcyNTk0NzUyNX0.6NY7rVUkAsmZ5PMGuNLpiVDQef-L6qAwsG-Ul_8IQVc",
      },
    });
    const json = await response.json();
    setNotes(json.data);
  
  };
  //function to add a new note
  const addNote = async ({ title, description, tag }) => {
    // <Alert message="New notes Added"/>

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    setNotes([...notes, note]);
  };
  //function to add a new note
  const deleteNote = async (id) => {
    //API CALL TO DELETE THE NOTE

    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
 // eslint-disable-next-line
    const updatedNotes = notes.filter((note) => {
      if (note._id !== id) {
        return note;
      }
    });
    setNotes(updatedNotes);
  };
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit in client
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setNotes(newNotes);
        break;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
