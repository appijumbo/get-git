import React, { useState, useEffect } from "react";
import "./list.css";

const RepoList = ({ list }) => {
  // let listObj = list["items"];
  // let listArray = [];
  const [theListArray, setTheListArray] = useState([]);
  const [theOrder, setTheOrder] = useState("asc");

  // console.log(listObj);

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
          readme:
            listObj[theRepo].owner.html_url +
            "/" +
            listObj[theRepo].name +
            "#readme",
        });
      })();
    }

    setTheListArray(listArray);
  }, [list]);

  const handleListOrder = () => {
    if (theOrder === "asc") {
      setTheListArray(theListArray.reverse());
      setTheOrder("desc");
    } else {
      setTheListArray(theListArray.reverse());
      setTheOrder("asc");
    }
  };

  const theList = theListArray.map((item) => {
    return (
      <div key={item.node_id} className="listCard">
        <a href={item.html_url} target="blank" className="imageLink">
          <img
            src={item.avatar_url}
            alt={item.repoName}
            className="repoAvatar"
          />
          <div className="listHtmlUrl">{item.html_url}</div>
        </a>
        <ul>
          <li className="listName">{item.repoName}</li>
          <li className="listLogin">{item.login}</li>
          <li className="listDescripion">{item.description}</li>
          {/* README needs to be a modal */}
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
    </>
  );
};

export default RepoList;
