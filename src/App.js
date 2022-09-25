import React, { useEffect, useState } from "react";
import "./App.css";
import { Octokit } from "@octokit/rest";

function App() {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_TOKEN,
  });

  const [user, setUser] = useState("");
  const [minFollower, setMinFollowers] = useState(0);
  const [repoName, setRepoName] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");

  // Need to be able to Sort
  // Need to be able to filter
  // Need to be able to select via click

  // "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"

  useEffect(() => {
    //const data = await octokit.request("GET /octocat", {});
  });

  const handleUserSearch = (e) => {
    e.preventDefault();
    // need to check if search is valid first
    // const URL =  `/repos/{owner}/{repo}/{path}`;
    // const Ref =  `heads/master`;

    // https://api.github.com/?URL=search/users?q=ap

    //https://api.github.com/search/users?q=ap
    //const URL = `search/users?q=ap`;
    (async () => {
      //const { data } = await octokit.request(`GET /search/users?q=appij`, {});

      /*
      q=tetris+language:assembly&sort=stars&order=desc

      This query searches for repositories with the word tetris in the name, the description, or the README. The results are limited to repositories where the primary language is assembly. The results are sorted by stars in descending order, so that the most popular repositories appear first in the search results.
      */
      const { data } = await octokit.request(
        `GET /search/repositories?q=tetris+language:assembly&sort=stars&order=desc`,
        {}
      );

      /*
      https://api.github.com/repos/octocat/Spoon-Knife/issues?per_page=2&sort=updated&direction=asc
      */
      /*
      const data = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "Spoon-Knife",
        per_page: 2,
        sort: "updated",
        direction: "asc",
      });
      */

      console.log(data);
    })();
  };

  const handleRepoSearch = (e) => {
    e.preventDefault();
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handleMinFollower = (e) => {
    setMinFollowers(e.target.value);
  };

  const handleRepoName = (e) => {
    setRepoName(e.target.value);
  };

  const handleRepoLanguage = (e) => {
    setRepoLanguage(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleUserSearch}>
        <fieldset>
          <label>
            User
            <input type="text" value={user} onChange={handleUser} />
          </label>
          <label>
            Minimum Number of Followers
            <input
              type="text"
              value={minFollower}
              onChange={handleMinFollower}
            />
          </label>
          <button type="submit">Search Users</button>
        </fieldset>
      </form>

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
}

export default App;
