import React from "react";

const RepoList = ({ list }) => {
  let listObj = list["items"];
  let listArray = [];

  for (const theRepo in listObj) {
    listArray.push({
      node_id: listObj[theRepo].node_id,
      name: listObj[theRepo].name,
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
  }

  console.log(listArray);

  const theList = listArray.map((item) => {
    return (
      <div key={item.node_id}>
        <ul>
          <li>{item.name}</li>
          <li>{item.login}</li>
          <li>{item.html_url}</li>
          <li>{item.avatar_url}</li>
          <li>{item.description}</li>
          <li>{item.stargazers_count}</li>
          {/* README needs to be a modal */}
        </ul>
      </div>
    );
  });

  return (
    <>
      <h1>List</h1>
      {theList}
    </>
  );
};

export default RepoList;
