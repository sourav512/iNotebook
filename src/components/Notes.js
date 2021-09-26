import React,{useContext} from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,addNote} = context;
  return (
    <div className="row">
      <h2>Your Notes</h2>
      {notes.map((elem) => {
        return <Noteitem key={elem._id} note={elem}/>;
      })}
    </div>
  );
};

export default Notes;
