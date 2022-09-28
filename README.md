# GitHub API Test

Your task is to develop a single page application that connects to the https://docs.github.com/en/rest and retrieves repository data based on user input.

Upon retrieval you should build an appropriate UI for the data, treating accessibility as a first class citizen.

The UI should display counts for stars, forks, likes, and issues per repository. Links to the repository and the author should be visible and finally, a detailed view whereby we will be
able to read the readme details.

During development we'd ask that you publish your code to a public repository (Github,
Gitlab or Bitbucket).

You should ideally spend no longer than an evening on this test, and your repository should contain a readme detailing your solution, along with any other information you think relevant to support your submission.

## Technical Requirements

- The solution must work in a modern browser
- The code must be pushed to a public repository
- The readme should contain steps so that we can run your solution locally

## System Requirements

The following form a basic set of acceptance criteria for your submission, they are deliberately basic to allow you room to expand in areas you think appropriate.

- Must be a single page application.
- Must retrieve data from the GitHub REST API, how you do this is up to you.
- UI should allow the user various actions on the retrieved data such as search and filtering.
- Must be able to display the repository name, author and link back to the repository.
- Must be able to display a more detailed view containing the readme and any additional information you deem necessary.

### Installation

To run on `http://localhost:3000/`

https://github.com/appijumbo/get-git

assuming one already has SSH auth setup with GitHub
and have Node version manager installed

```bash
$ git clone git@github.com:appijumbo/get-git.git

$ cd get-git

$ nvm install --lts

$ npm install

$ npm start
```

### Solution

React based pp with a Search and List components. The layout and such was bespoke.
Looking back it may have been better to use some framework with prebuilt components?

The intent was to add mobile breakpoints with media queries likely shifting the buttons so they are all at the bottom and reshaping the list card. This would be done in future.

#### Modal Displays Rich text

The modal takes the markdown and tries to convert to rich text. I used two packages to do this a s the packages I found to convert from md to rich-text direct had some Webpack 5 issues.

#### Author vs Owner

I wasn't clear about the difference between owner and author, hence implemented owner. Similar for 'likes’ I couldn't fir this for GitHub hence 'Watchers' implemented instead

#### Form Validation

The form entry has some validation, changing spaces for hyphens, limiting the length. This validation could do with tweaking perhaps for future.

The description text length is limited to 20 characters. This is because from some user testing I found on some repos typically Chinese, several pages of text are being injected into the description.

#### Favourites

Card contains an 'F' for 'favourites' button. Card goes red and its now held in the favourites list. Clicking the 'Favs' button will display the favourites list only.
Currently changing the page wipes this list. Since the list is an array of objects, this could be easily stored in localStorage via a return inside the page useEffect or similar and remounted via spreading when mounting RepoList component on a new page

#### Accessibility

Colour Scheme :Used Adobe colour wheel and its accessibility tools to check the contrast
Lighthouse: Checked with Googles devTool and it gave 97 Performance, 100 Accessibility, 92 Best Practices.
However this was set to desktop only, as mobile not yet implemented

#### Search not using Octkit API

Issues with Authorization using Ocokit. Worked in App.js but failed in Search.js
Rather than spemd time finding API issue focused on building the app by using traditional fetch as can at least GET open repos using fetch.

NOTE: get a token from GitHub and save this as into a file at root of project called .env
eg

.env

```
REACT_APP_TOKEN="your_token_string_goes_here"
```

and use via

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

Later experimented with authorization token in the header on the fetch in `<Search />`
NOTE: This is commented out in case this creates issues for others installiing without a token

### Outstanding bugs

I wanted the list to refresh on page change hence I used a useEffect, but this has created a warning. There's probably something slightly 'off' here.

Likewise the form entry dosnt allow the last character to be deleted. Unsure why this is?

### Modal as Seperate Compnent

For future, it may be sensible to put the modal in its own component

### REST API notes

REST endpoints
https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps

https://api.github.com

/search/users?q={query}{&page,per_page,sort,order}

/search/repositories?q=${repoName}+language:${repoLanguage}&sort=stars&order=desc

Check valid limits
https://github.com/dead-claudia/github-limits
