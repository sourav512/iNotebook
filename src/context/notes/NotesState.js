import react,{useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const getNote =async () =>{
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0Y2MyODE5MzdlMmY5YWU1N2I4OGQ3IiwiZW1haWwiOiJuaWtoaWxAZ21haWwuY29tIn0sImlhdCI6MTYzMjYwMTU3OH0.MW6LEBOlP8nz6bVNgAX0R1P0E0jgGhgsWagYAxMPbpk",
            }
          });
        // const notesInitial = await response.json();
        console.log(response);
    }


    const addNote =async (title,description,tag) =>{
        console.log("adding a new note");
        const note = {
            "_id": "614cc3s34937e2f9ae57bd88e0",
            "user": "614cc281937e2f9ae57b88d7",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-23T18:11:00.188Z",
            "__v": 0
        };//todo
        setNotes(notes.concat(note));
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0Y2MyODE5MzdlMmY5YWU1N2I4OGQ3IiwiZW1haWwiOiJuaWtoaWxAZ21haWwuY29tIn0sImlhdCI6MTYzMjYwMTU3OH0.MW6LEBOlP8nz6bVNgAX0R1P0E0jgGhgsWagYAxMPbpk",
            },
            body: JSON.stringify({title,description,tag})
          });
          response.json();
    }
    const deleteNote = (id) =>{
        console.log("deleted with id ",id);
        const newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote)
    }
    const editNote =async (id,title,desc,tag) =>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0Y2MyODE5MzdlMmY5YWU1N2I4OGQ3IiwiZW1haWwiOiJuaWtoaWxAZ21haWwuY29tIn0sImlhdCI6MTYzMjYwMTU3OH0.MW6LEBOlP8nz6bVNgAX0R1P0E0jgGhgsWagYAxMPbpk",
            },
            body: JSON.stringify({title,desc,tag})
          });
          response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id ) {
                element.title = title;
                element.description = desc;
                element.tag = tag;
            }
        }
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState