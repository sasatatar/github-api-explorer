## Setup

Go to https://github.com/settings/tokens and generate a GitHub access token. Paste the token into the `.env.example` and rename it to `.env`.

```
// Install dependencies
npm install

// Start the app
npm start

// Build for production (dist folder)
npm build

// Generate graphql types (src/__generated__ folder)
npm run codegen
```

Live preview: https://romantic-cori-ad4679.netlify.app/


## Tech stack

- The entire project was set up from zero, no template was used. Parcel was used for code bundling and local development. It is fast, feature rich and easy to configure (most things work out of the box), compared to other more powerful bundlers such as Webpack. 
- Typescript is sometimes a pain (it enforces verbose type definitions, even for simple util functions), but thanks to VS Code IntelliSense, it saves time and offers an overall much better work experience, especially in large projects.
- Tailwind is used for the, addmitedly, poor man's styling (still working on it), since it proved itself as a really good design pattern that strikes a good balance between predefined styles and customizability.
- Apollo Client is used for GraphQL integration. It is currently the most comprehensive toolset for GraphQL + JS combination. It integrates really well with React, and combined with highly configurable data caching, it can be used for client-side state management as well.
- `react-router-dom` is used for declarative client side routing (https://reactrouter.com/web/guides/quick-start).

All in all, I really enjoyed working on this project, as it helped me get better acquainted with the thechnologies used.


## Notes and issues

### Apollo client
- `apollo client:codegen` command is used to generate graphql types automatically, based on the queries used. The command would fail (unable to find rxjs module - [error screenshot](yarn-bug.JPG)) if `yarn` was used to install dependencies - not sure why. After running `npm install`, the problem disappeared.
- On the profile page `useQuery` is used to fetch both the user data and the first load of repos with the same request, and more repos alone can be loadad using the `fetcMore` API. This seemed like a great idea at firts, but the change of `orderBy` parameter cannot use the `fetchMore` (`fetchMore` merges the results with the existing list of repos that can have different ordering, which is bad), so the entire page reloads and the user data is loaded again as well. 
`TODO:` split the user data and repos in two seperate queries which will need two seperate requestes to the server initially, but the solution is overall cleaner and easier to manage.
- Also related to the `fetchMore` API, the `loading` value is not updated, even though I used the `notifyOnNetworkStatusChange` as instructed in the docs, so there is no loading indicator when loading more repos. Will try to see what is the issue.
- The `updateQuery` callback for `fetchMore` is deprecated, and will be removed in the next major version of Apollo Client. `TODO:` convert updateQuery functions to field policies with appropriate
read and merge functions - this also fixes the previous issue, so definitely worth looking into.

### Misc
- Good to know: initially .env file was included in the repo, since the access token is exposed in the network console anyway, but Gihub checks for unintentionally comitted tokens and cancels them automatically.
- Debouncing functions that update state is a bit complicated, since each re-render creates a new debounced function (need to use the `useCallback` hook to persist the function between re-renders). It was simpler to use the `useDebounce` hook instead.
- `TODO:` implement sort direction.

### Styling
- The app is not optimized for mobile devices, but I might do it in the future for practice. 
- For some reason ::-webkit-scrollbar-thumb class is not included from styles.css in the budeled css file, which consequently makes the scrollbar handle invisible in production (on Chrome and Edge). `TODO:` try to figure out the cause and fix it.
