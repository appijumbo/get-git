import React, { useState, useEffect } from "react";
import "./search.css";

const Search = ({ setList }) => {
  const [repoName, setRepoName] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");

  const handleRepoSearch = (e) => {
    e.preventDefault();
    (async () => {
      const githubUrl = "https://api.github.com";
      const gitData = await fetch(
        `${githubUrl}/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc&per_page=100&page=1`
      );
      const content = await gitData.json();

      console.log(content);
      setList(content);
    })();
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
    }
  };

  const handleRepoName = (e) => {
    handleRepo(e, setRepoName);
  };

  const handleRepoLanguage = (e) => {
    handleRepo(e, setRepoLanguage);
  };

  return (
    <div className="searchWrapper">
      <form onSubmit={handleRepoSearch}>
        <fieldset>
          <label>
            Repo Name
            <input type="text" value={repoName} onChange={handleRepoName} />
          </label>
          <label>
            Language
            <input
              type="text"
              value={repoLanguage}
              onChange={handleRepoLanguage}
            />
          </label>
          <button type="submit">Search Repo</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Search;
