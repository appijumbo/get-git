import React, { useState } from "react";
import "./search.css";
// import { Octokit } from "@octokit/rest";

const Search = () => {
  //   const octokit = new Octokit({
  //     auth: process.env.REACT_APP_TOKEN,
  //   });

  const [repoName, setRepoName] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");

  /****************************************
   * REST API notes
   *
   * https://api.github.com
   *
   * /search/users?q={query}{&page,per_page,sort,order}
   *
   * /search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc
   *
   * Check valid limits
   * https://github.com/dead-claudia/github-limits
   * **************************************/

  const handleRepoSearch = (e) => {
    e.preventDefault();
    (async () => {
      //TODO: issues with Authorization using Ocokit. Switching to traditonal fetch as can at least GET open repos using fetch. Later figure out issue and switch back to Octokit
      //   const { data } = await octokit.request(
      //     `GET /search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc`,
      //     {}
      //   );

      const githubUrl = "https://api.github.com";
      const gitData = await fetch(
        `${githubUrl}/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc`
      );
      const content = await gitData.json();

      console.log(content);
    })();
  };

  const handleRepoName = (e) => {
    const name = e.target.value;
    const pattern = /[A-Za-z0-9._-]/;
    if (pattern.test(name) && name.length <= 39) {
      let nameArray = name.split("");
      if (nameArray[name.length - 1] === " ") {
        nameArray.pop();
        nameArray.push("-");
        setRepoName(nameArray.join(""));
      } else {
        setRepoName(name);
      }
    }
  };

  const handleRepoLanguage = (e) => {
    const name = e.target.value;
    const pattern = /[A-Za-z._-]/;
    if (pattern.test(name) && name.length <= 39) {
      let nameArray = name.split("");
      if (nameArray[name.length - 1] === " ") {
        nameArray.pop();
        nameArray.push("-");
        setRepoLanguage(nameArray.join(""));
      } else {
        setRepoLanguage(name);
      }
    }
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
