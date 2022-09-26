import React from "react";
import "./list.css";

const RepoList = ({ list }) => {
  let listObj = list["items"];
  let listArray = [];

  console.log(listObj);

  for (const theRepo in listObj) {
    // (async () => {
    //   const ownerUrl = listObj[theRepo].owner.url;
    //   const getUrl = await fetch(ownerUrl);
    //   const contentUrl = await getUrl.json();
    //   const ownerName = await contentUrl.name;
    //   console.log(ownerName);

    listArray.push({
      node_id: listObj[theRepo].node_id,
      repoName: listObj[theRepo].name,
      login: listObj[theRepo].owner.login,
      html_url: listObj[theRepo].owner.html_url,
      avatar_url: listObj[theRepo].owner.avatar_url,
      forks_count: listObj[theRepo].forks_count,
      description: listObj[theRepo].description,
      stargazers_count: listObj[theRepo].stargazers_count,
      readme:
        listObj[theRepo].owner.html_url +
        "/" +
        listObj[theRepo].name +
        "#readme",
    });
    // })();
  }

  const theList = listArray.map((item) => {
    return (
      <div key={item.node_id} className="listCard">
        <a href={item.html_url} target="blank" className="imageLink">
          <img
            src={item.avatar_url}
            alt={item.repoName}
            className="repoAvatar"
          />
        </a>
        <ul>
          <li className="listName">{item.repoName}</li>
          <li className="listLogin">{item.login}</li>
          <li className="listHtmlUrl">{item.html_url}</li>
          <li className="">{item.description}</li>
          <li className="">{item.stargazers_count}</li>
          {/* README needs to be a modal */}
        </ul>
      </div>
    );
  });

  return (
    <>
      <h1>Repo list</h1>
      <div className="listWrapper">{theList}</div>
    </>
  );
};

export default RepoList;
