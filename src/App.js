import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Octokit } from "octokit";

function App() {
  console.log(process.env.REACT_APP_TOKEN);

  // const octokit = new Octokit({
  //   auth: process.env.REACT_APP_TOKEN,
  // });

  // useEffect(() =>  {

  //   const data = await octokit.request("GET /octocat", {});

  // }, )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
