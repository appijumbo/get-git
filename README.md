# Github API Test

Your task is to develop a single page application that connects to the https://docs.github.com/en/rest and retrieves repository data based on user input.

Upon retrieval you should build an appropriate UI for the data, treating accessibility as a first class citizen.

The UI should display counts for stars, forks, likes, and issues per repository. Links to the repository and the author should be visible and finally, a detailed view whereby we will be
able to read the readme details.

During development we'd ask that you publish your code to a public repository (Github,
Gitlab or Bitbucket).

You should ideally spend no longer than an evening on this test, and your repository should contain a readme detailing your solution, along with any other information you think relevant to support your submission.

### Technical Requirements

- The solution must work in a modern browser
- The code must be pushed to a public repository
- The readme should contain steps so that we can run your solution locally

### System Requirements

The following form a basic set of acceptance criteria for your submission, they are deliberately basic to allow you room to expand in areas you think appropriate.

- Must be a single page application.
- Must retrieve data from the Github REST API, how you do this is up to you.
- UI should allow the user various actions on the retrieved data such as search and filtering.
- Must be able to display the repository name, author and link back to the repository.
- Must be able to display a more detailed view containing the readme and any additional information you deem necessary.

### REST API notes

https://api.github.com

/search/users?q={query}{&page,per_page,sort,order}

/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc

Check valid limits
https://github.com/dead-claudia/github-limits

### Search not using Octkit API

Issues with Authorization using Ocokit. Switching to traditonal fetch as can at least GET open repos using fetch.
Later figure out issue and switch back to Octokit

Worked in App.js but failed in Search.js Possibly something to do with root?

example

```js
import { Octokit } from "@octokit/rest";
.
.
   const octokit = new Octokit({
 auth: process.env.REACT_APP_TOKEN,
});
.
.

const { data } = await octokit.request(
  `GET /search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc`,
  {}
);
```
