import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import RepoList from "./components/RepoList";

function App() {
  const [list, setList] = useState({});

  return (
    <div className="pageWrapper">
      <Search setList={setList} />
      <RepoList list={list} />
    </div>
  );
}

export default App;
