import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables } from '~__generated__/Repos';
import { url } from 'inspector';

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
                            <div className="w-full py-5">
                                <div className="w-1/4 h-full border-r">
                                    <div className="w-full flex flex-col items-end pr-3">
                                        <img src={user.avatarUrl} alt={user.name || ''}
                                            className="mb-2 w-48 h-48 rounded shadow-md"
                                        />
                                        <div
                                            className="flex-1"
                                        >
                                            <div className="text-2xl font-bold text-gray-700 text-right">{user.name}</div>
                                            <div className="text-lg text-gray-600 w-full flex-1 flex flex-col items-end">
                                                <p className="mt-2">
                                                    <a className="text-blue-500 hover:underline" href="#"
                                                        onClick={() => window.open(user?.url, "blank")}
                                                    >
                                                        <i className="fab fa-github-square mr-1"></i>
                                                        <span className="">{user.login}</span>
                                                    </a>
                                                </p>
                                                <p className="mt-2">
                                                    <i className="far fa-envelope text-gray-600 mr-1"></i>
                                                    <span className="flex-1 ">{user.email || '-'}</span>
                                                </p>
                                                <p className="mt-5 text-right text-base">
                                                    {user.bio}
                                                </p>
                                            </div>
                                        </div>

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