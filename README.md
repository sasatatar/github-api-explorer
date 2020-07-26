## Notes

- `apollo codegen:generate` is used to generate typescript types and interfaces automatically based on GraphQL queries. See https://youtu.be/1PVrZNi3sb8 for reference.
- `apollo codegen:generate` would fail (unable to find rxjs/index.js in node_modules) if `yarn` was used to install dependencies. Switching to `npm` solved the problem (have no idea why).
- I was unable to figure out how to reference a Github PAT from .env file in npm codegen script, so I duplicated it, since it is used for fetching the GraphQL scheme from the server. Something to look into in the future...