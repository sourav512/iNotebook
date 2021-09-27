import React, { useContext, useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";


const Notes = () => {
  let history = useHistory();
  const context = useContext(noteContext);
  const { notes, addNote, getNote,editNote } = context;
  const [note, setNote] = useState({id:"",etitle:"",edesc:"",etag:""})
  
  const onchange = (e) =>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  const handleClick = () =>{
    refClose.current.click();
    editNote(note.id,note.etitle,note.edesc,note.etag);
    console.log(note);
  }
  
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
    getNote();
    //eslint-disable-next-line
  }, []);
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle: currentNote.title, edesc: currentNote.description, etag:currentNote.tag})
}

  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <div>
      <button style={{display:"none"}} type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="desc" className="form-label">
                      Description
                    </label>
                    <input type="text" className="form-control" id="edesc" name="edesc" onChange={onchange} value={note.edesc}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="desc" className="form-label">
                      Description
                    </label>
                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} />
                  </div>
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" disabled={note.etitle.length<3 || note.edesc.length<5} className="btn btn-primary" onClick={handleClick}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((elem) => {
          console.log(typeof elem._id);
          return (
            <Noteitem key={elem._id} updateNote={updateNote} note={elem} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
