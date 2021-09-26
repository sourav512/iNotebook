import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {

  return (
    <>
      <AddNote/>
      <Notes/>
    </>
  );
};

export default Home;
