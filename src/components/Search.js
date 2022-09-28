import React, { useState, useEffect } from "react";
import "./search.css";

const Search = ({ setList }) => {
  const [repoName, setRepoName] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");
  const [page, setPage] = useState(1);

  const getData = async () => {
    const githubUrl = "https://api.github.com";
    const gitData = await fetch(
      `${githubUrl}/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc&per_page=10&page=${page}`,
      {
        headers: {
          authorization: process.env.REACT_APP_TOKEN,
        },
      }
    );
    const content = await gitData.json();

    console.table(content.items);
    setList(content);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleRepoSearch = (e) => {
    e.preventDefault();
    getData();
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

  const handleChangePage = (upDown) => {
    if (upDown === "up") {
      setPage((page) => page + 1);
    }
    if (upDown === "down" && page !== 1) {
      setPage((page) => page - 1);
    }
    console.log("page has changed  ", page);
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
            />
          </label>
          <label>
            Language
            <input
              type="text"
              value={repoLanguage}
              onChange={handleRepoLanguage}
              placeholder="javascript"
            />
          </label>
          <button type="submit">Search Repo</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Search;
