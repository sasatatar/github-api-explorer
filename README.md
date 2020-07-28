## Setup

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


## Notes

- `apollo client:codegen` command is used to generate graphql types automatically, based on the queries used. The command would fail (unable to find rxjs module - [error screenshot](yarn-bug.JPG)) if `yarn` was used to install dependencies - not sure why. After running `npm install`, the problem disappeared.

- Initially .env file was included in the repo, since the access token is exposed in the network console anyway, but Gihub checks for unintentionally comitted tokens and cancels them automatically.
- Debouncing functions that update state is not possible, since each re-render creates a new debounced function. Had to use `useDebounce` hook instead.
