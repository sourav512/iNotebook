import React,{useContext,useState} from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const handleClick = () =>{
        addNote(note.title,note.desc,note.tag);
        setNote({title:"",desc:"",tag:""})
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
            <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="desc" value={note.desc} name="desc" onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onchange}/>
          </div>
          <button type="button" disabled={note.title.length<3 || note.desc.length<5} onClick={handleClick} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
}

export default AddNote
