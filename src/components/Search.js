import React, { useState, useEffect, useRef } from "react";
import "./search.css";

/****************************************************************
 * Form for repo owner and name with page number fetches the data
 * and passes the data up to App component.
 ****************************************************************/
const Search = ({ setList }) => {
  const [repoName, setRepoName] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");
  const [page, setPage] = useState(1);

  const languageNameInput = useRef(null);
  const repoNameInput = useRef(null);

  const getData = async () => {
    const githubUrl = "https://api.github.com";
    const gitData = await fetch(
      `${githubUrl}/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc&per_page=10&page=${page}`
      // {
      //   headers: {
      //     authorization: process.env.REACT_APP_TOKEN,
      //   },
      // }
    );
    const content = await gitData.json();
    setList(content);
  };

  // Page change needs refreshing
  useEffect(() => {
    getData();
  }, [page]);

  const handleRepoSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const clearForm = () => {
    repoNameInput.current.value = "";
    languageNameInput.current.value = "";
    setList("");
    setRepoName("");
    setRepoLanguage("");
    setPage(1);
  };

  const handleRepo = (e, setRep) => {
    const name = e.target.value;
    const pattern = /[.A-Za-z0-9_-]/;
    if (pattern.test(name) && name.length <= 39) {
      let nameArray = name.split("");
      if (nameArray[name.length - 1] === " ") {
        nameArray.pop();
        nameArray.push("-");
        setRep(nameArray.join(""));
      } else {
        setRep(name);
      }
    } else if (name === "") {
      setRep("");
    }
  };

  const handleRepoName = (e) => {
    handleRepo(e, setRepoName);
  };

  const handleRepoLanguage = (e) => {
    handleRepo(e, setRepoLanguage);
  };

  const handleChangePage = (upDown) => {
    if (upDown === "up") {
      setPage((page) => page + 1);
    }
    if (upDown === "down" && page !== 1) {
      setPage((page) => page - 1);
    }
  };

  const PageBlk = () => {
    return (
      <div className="pageBlk">
        <button onClick={() => handleChangePage("down")}>Page Down</button>
        <div className="pageCount">{page}</div>
        <button onClick={() => handleChangePage("up")}>Page Up</button>
      </div>
    );
  };

  return (
    <div className="searchWrapper">
      <PageBlk />
      <form onSubmit={handleRepoSearch}>
        <fieldset className="formField">
          <label>
            Repo Name
            <input
              type="text"
              value={repoName}
              onChange={handleRepoName}
              placeholder="pop-os/pop"
              name="repoName"
              id="repoName"
              ref={repoNameInput}
            />
          </label>
          <label>
            Language
            <input
              type="text"
              value={repoLanguage}
              onChange={handleRepoLanguage}
              placeholder="javascript"
              name="languageName"
              id="languageName"
              ref={languageNameInput}
            />
          </label>

          <div className="buttonRow">
            <button type="submit">Search Repo</button>
            <button onClick={clearForm}>Clear</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Search;
