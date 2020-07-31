import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables } from '~__generated__/Repos';

const QUERY_REPOS = gql`
    query Repos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=5){
        user(login: $login) {
            login,
            email,
            name,
            url,
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

        <div className="max-w-4xl mx-auto sm:w-full flex-1 flex flex-row items-center">

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
                            <div>
                                <img src={user.avatarUrl} className="w-40 h-40 m-4" />
                                <div>{user?.name}</div>
                            </div>
                        )
                        : <div>No such user</div>
            }
        </div >
    )
}