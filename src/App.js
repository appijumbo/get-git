import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import RepoList from "./components/RepoList";

function App() {
  const [list, setList] = useState({});

  return (
    <>
      <Search setList={setList} />
      <RepoList list={list} />
    </>
  );
}

export default App;
