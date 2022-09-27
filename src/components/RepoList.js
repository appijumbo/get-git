import React, { useState, useEffect } from "react";
import "./list.css";

const RepoList = ({ list }) => {
  const [theCurrentListArray, setTheCurrentListArray] = useState([]);
  const [thePageListArray, setThePageListArray] = useState([]);
  const [theFavListArray, setTheFavListArray] = useState([]);
  const [theOrder, setTheOrder] = useState("asc");
  const [favs, setFavs] = useState(false);

  // https://api.github.com/repos/ReactiveX/RxAndroid/issues?page=0&per_page=1
  useEffect(() => {
    let listArray = [];
    let listObj = list["items"];
    for (const theRepo in listObj) {
      (async () => {
        // const ownerUrl = listObj[theRepo].owner.url;
        // console.log("ownerUrl  ", ownerUrl);

        //   const getUrl = await fetch(ownerUrl);
        //   const contentUrl = await getUrl.json();
        //   const ownerName = await contentUrl.name;
        //   console.log(ownerName);

        let descText = "";

        if (typeof listObj[theRepo].description !== "string") {
          descText = "";
        } else if (listObj[theRepo].description.length > 20) {
          descText = listObj[theRepo].description.substring(0, 20);
        }

        const readme =
          listObj[theRepo].owner.html_url +
          "/" +
          listObj[theRepo].name +
          "#readme";

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
          readme: readme,
          favourite: false,
        });
      })();
    }

    setTheCurrentListArray(listArray);
    console.table(listArray);
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

  const handleReadmeModal = (readmeurl) => {
    console.log(readmeurl);
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
          <li className="listName">{item.repoName}</li>
          <li className="listLogin">{item.login}</li>
          <li className="listDescripion">{item.description}</li>
          <li>
            <button
              className="readmeModal"
              onClick={() => handleReadmeModal(item.readme)}
            >
              Readme
            </button>
          </li>
        </ul>
        <div className="starCount">
          <div>Stars {item.stargazers_count}</div>
          <div>Forks {item.forks_count}</div>
          <div>Watchers {item.watchers_count}</div>
        </div>
      </div>
    );
  });

  return (
    <>
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
