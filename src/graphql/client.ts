import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RepositoryData_user_repositories } from '../__generated__/RepositoryData';

export default new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                fields: {
                    repositories: {
                        merge(existing: RepositoryData_user_repositories | undefined, incoming: RepositoryData_user_repositories | undefined) {
                            if (!existing) return incoming;
                            return {
                                ...incoming,
                                nodes: [
                                    ...existing.nodes, ...incoming?.nodes
                                ]
                            }
                        },
                        keyArgs: ['orderBy']
                    }
                }
            }
        }
    }),
    headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
});