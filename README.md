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

## Notes

- `apollo client:codegen` command is used to generate typescript types and interfaces automatically based on GraphQL queries. See https://youtu.be/1PVrZNi3sb8 for reference. The command would fail (unable to find rxjs module - [error screenshot](yarn-bug.JPG)) if `yarn` was used to install dependencies - not sure why. After running `npm install`, the problem disappeared.

- Initially .env file was included in the repo, since the access token is obtainable from the network console anyway, but Gihub checks for unintentionally comitted tokens and cancels them automatically.
- Debouncing functions that update state is not possible since each re-render creates a new debounced function. Had to use `useDebounce` hook instead.
