import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import "./list.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RepoList = ({ list }) => {
  const [theCurrentListArray, setTheCurrentListArray] = useState([]);
  const [thePageListArray, setThePageListArray] = useState([]);
  const [theFavListArray, setTheFavListArray] = useState([]);
  const [theOrder, setTheOrder] = useState("asc");
  const [favs, setFavs] = useState(false);

  // const [readmeModal, setReadmeModal] = useState("closed");
  const [isOpen, setIsOpen] = useState(false);
  const [readmeText, setReadmeText] = useState("-- No Text --");

  // https://api.github.com/repos/ReactiveX/RxAndroid/issues?page=0&per_page=1
  useEffect(() => {
    let listArray = [];
    let listObj = list["items"];
    for (const theRepo in listObj) {
      (async () => {
        let descText = "";

        if (typeof listObj[theRepo].description !== "string") {
          descText = "";
        } else if (listObj[theRepo].description.length > 20) {
          descText = listObj[theRepo].description.substring(0, 20);
        }

        const readme =
          listObj[theRepo].owner.login + "/" + listObj[theRepo].name;

        listArray.push({
          node_id: listObj[theRepo].node_id,
          repoName: listObj[theRepo].name,
          login: listObj[theRepo].owner.login,
          html_url: listObj[theRepo].owner.html_url,
          avatar_url: listObj[theRepo].owner.avatar_url,
          forks_count: listObj[theRepo].forks_count,
          description: descText,
          stargazers_count: listObj[theRepo].stargazers_count,
          watchers_count: listObj[theRepo].watchers_count,
          open_issues_count: listObj[theRepo].open_issues_count,
          readme: readme,
          favourite: false,
        });
      })();
    }

    setTheCurrentListArray(listArray);
  }, [list]);

  const handleListOrder = () => {
    if (theOrder === "asc") {
      setTheCurrentListArray(theCurrentListArray.reverse());
      setTheOrder("desc");
    } else {
      setTheCurrentListArray(theCurrentListArray.reverse());
      setTheOrder("asc");
    }
  };

  const handleFav = (e) => {
    let currentList = theCurrentListArray.map((repo) => {
      if (repo.node_id === e.target.id) {
        repo.favourite ? (repo.favourite = false) : (repo.favourite = true);
      }
      return repo;
    });

    setTheCurrentListArray(currentList);

    const favList = theCurrentListArray.filter((repo) => {
      return repo.favourite === true;
    });
    setTheFavListArray(favList);
  };

  const handleFilterFavs = () => {
    if (favs) {
      setFavs(false);
      setTheCurrentListArray(thePageListArray);
    } else {
      setFavs(true);

      setThePageListArray(theCurrentListArray);
      setTheCurrentListArray(theFavListArray);
    }
  };

  const toggleModal = async (readmeurl) => {
    console.log("README PRESSED");
    setIsOpen(!isOpen);
    console.log("*****************************");
    console.log("modal isOpen  ", isOpen);
    ///repos/{owner}/{repo}/readme
    const theUrl = "https://api.github.com";
    const theReadmeEndpoint = `/repos/${readmeurl}/readme`;
    try {
      const data = await fetch(theUrl + theReadmeEndpoint);
      const theJson = await data.json();
      const base64theContent = await theJson.content.toString();
      const buff = Buffer.from(base64theContent, "base64");
      setReadmeText(buff.toString("utf-8"));
      console.log("*************************************");
      console.log(readmeText);
      console.log("*************************************");
    } catch (e) {
      console.log("No readme found");
      setReadmeText("-- No Text --");
      console.log("modal isOpen  ", isOpen);
    }
  };

  const theList = theCurrentListArray.map((item) => {
    return (
      <div
        key={item.node_id}
        className="listCard"
        style={{
          backgroundColor: item.favourite ? "red" : null,
        }}
      >
        <div className="leftGroup">
          <a href={item.html_url} target="blank" className="imageLink">
            <img
              src={item.avatar_url}
              alt={item.repoName}
              className="repoAvatar"
            />
          </a>
          <div className="bottomGroup">
            <a href={item.html_url} target="blank" className="listHtmlUrl">
              {item.html_url}
            </a>
            <button className="favRepo" onClick={handleFav} id={item.node_id}>
              F
            </button>
          </div>
        </div>
        <ul>
          <li className="listLogin">
            Owner <span>{item.login}</span>
          </li>
          <li className="listName">
            Repo Name<span>{item.repoName}</span>
          </li>
          <li className="listDescripion">
            Description<span>{item.description}</span>
          </li>
          <li>
            <button
              className="readmeModal"
              onClick={() => toggleModal(item.readme)}
            >
              Readme
            </button>
          </li>
        </ul>
        <div className="starCount">
          <div>Stars {item.stargazers_count}</div>
          <div>Forks {item.forks_count}</div>
          <div>Watchers {item.watchers_count}</div>
          <div>Issues {item.open_issues_count}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="README content"
      >
        <button onClick={toggleModal}>X</button>
        {readmeText}
      </Modal>
      <div className="listWrapper">{theList}</div>
      <button className="sort" onClick={() => handleListOrder()}>
        {theOrder}
      </button>
      <button className="filterFavs" onClick={() => handleFilterFavs()}>
        Favs
      </button>
    </>
  );
};

export default RepoList;
