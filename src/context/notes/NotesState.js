import react,{useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  const getNote =async () =>{
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken"),
      }
    });
    // const notesInitial = await response.json();
    const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    const addNote = async (title, description, tag) => {

      const response = await fetch(`${host}/api/notes/createnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken"),
        },
        body: JSON.stringify({title, description, tag})
      });
  
      const note = await response.json();
      console.log(note);
      setNotes(notes.concat(note.savedNote))
    }

    const deleteNote =async (id) =>{
        console.log("deleted with id ",id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authToken"),
          }
        });
        const newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote)
    }
    const editNote =async (id,title,desc,tag) =>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("authToken"),
            },
            body: JSON.stringify({title,description:desc,tag})
          });
          response.json();
          let newNote = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id ) {
              newNote[index].title = title;
              newNote[index].description = desc;
              newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote)
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState