import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables, Repos_user_repositories_edges } from '~__generated__/Repos';
import { UserProfile } from './UserProfile';

const QUERY_REPOS = gql`
    query Repos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=5){
        user(login: $login) {
            login,
            email,
            name,
            url,
            bio,
            avatarUrl(size: 200),
            repositories(first: $pageSize, orderBy: $orderBy, after: $cursor) {
                edges {
                    node {
                        name,
                        description,
                        url,
                    }
                },
                totalCount,
                pageInfo {
                    endCursor,
                    hasNextPage
                }
            }
        }
    }
`;

export const ProfilePage: React.FC<{}> = () => {

    let { userLogin } = useParams();
    let [orderBy, setOrderBy] = useState();
    let [cursor, setCursor] = useState();
    let [pageSize, setPageSize] = useState();

    let { data, loading, error } = useQuery<Repos, ReposVariables>(
        QUERY_REPOS,
        {
            variables: {
                login: userLogin,
                orderBy,
                cursor,
                pageSize
            }
        }
    );

    if (error) console.error(error);

    let user = data?.user;

    return (

        <div className="max-w-4xl mx-auto sm:w-full flex-1 flex flex-row">

            {
                loading
                    ? (
                        <div className="flex-1 h-full flex items-center justify-center">
                            <div className="flex flex-col items-center mb-8">
                                <LoadingSpinner className="h-16 w-16" />
                                <div className="mt-4 text-gray-600">Loading user data...</div>
                            </div>
                        </div>

                    )
                    : user
                        ? (
                            <div className="w-full flex flex-row">
                                <UserProfile user={user} />
                                <div className="flex-1 pl-5 mt-4">
                                    <div>
                                        Repositories
                                    </div>
                                    <div>
                                        <p>Repo data</p>
                                        {
                                            user.repositories?.edges && <Repositories repositories={user?.repositories?.edges} />
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="flex-1 h-full flex justify-center mt-40">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="mt-4 text-gray-600">User name <span className="font-mono text-gray-600 font-bold">{userLogin}</span> does not exist.</div>
                                </div>
                            </div>
                        )
            }
        </div >
    )
}

const Repositories: React.FC<{ repositories: (Repos_user_repositories_edges | null)[] | undefined }> = ({ repositories }) => {
    return (
        <div>
            {
                repositories && repositories.map((edge: Repos_user_repositories_edges | null) => {
                    let node = edge?.node;
                    return node && (
                        <div key={node.url}>
                            <h1>{node.name}</h1>
                            <p>{node.description}</p>
                            <a href="#">{node.url}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}