import React,{useContext} from 'react';
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote,editNote} = context;
  const { title, description } = props.note;
  return (
      <div className="col-md-3">
    <div className="card  my-2">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="btn-group btn-block" role="group">
    <button className="btn btn-primary" onClick={()=>{deleteNote(props.note._id)}}>Delete</button>
    <button className="btn btn-primary" onClick={editNote}>Edit</button>
  </div>
      </div>
      </div>
    </div>
  );
};

export default Noteitem;
