import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import RepoList from "./components/RepoList";

function App() {
  const [list, setList] = useState({});

  const theSetList = (list) => {
    setList(list);
  };

  return (
    <div className="pageWrapper">
      <Search setList={setList} />
      <RepoList list={list} />
    </div>
  );
}

export default App;
