import React,{useContext,useState} from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const handleClick = () =>{
        addNote(note.title,note.desc,note.tag);
    }
    const [note, setNote] = useState({title:"",desc:"",tag:""})
    const onchange = (e) =>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
        <h1>Add a note here</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onchange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="desc"
              name="desc"
              onChange={onchange}

            />
          </div>
          <button type="button" onClick={handleClick} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
}

export default AddNote
