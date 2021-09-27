import React, { useContext,useEffect } from "react";
import { useHistory } from "react-router-dom";
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
