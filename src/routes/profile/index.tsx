import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables, Repos_user_repositories_edges } from '~__generated__/Repos';
import { UserProfile } from './UserProfile';
import { Repositories } from './Repositories';
import { RepositoryOrderField, OrderDirection, RepositoryOrder } from '~__generated__/globalTypes';

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

export const Profile: React.FC<{}> = () => {

    let { userLogin } = useParams();
    // let [orderBy, setOrderBy] = useState<RepositoryOrder>();
    let orderBy: RepositoryOrder | null = null;
    let [orderField, setOrderField] = useState<RepositoryOrderField | ''>('');
    let [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC);

    orderBy = orderField
        ? {
            field: orderField,
            direction: orderDirection
        }
        : null;

    let [cursor, setCursor] = useState();
    let [pageSize, setPageSize] = useState<number>();

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
                                <div className="flex-1 pt-4 pl-4">
                                    <div className="flex flex-row mb-2 items-baseline">
                                        <h1 className="text-gray-800 text-lg font-semibold">Repositories</h1>
                                        <label className="ml-auto text-sm text-gray-800 mr-1">Order by</label>
                                        <select
                                            onChange={e => {
                                                let value = e.target.value;
                                                setOrderField(value);
                                            }}
                                            value={orderField} className="text-sm rounded-sm border"
                                        >
                                            <option value={''}>None</option>
                                            <option value={RepositoryOrderField.NAME}>Name</option>
                                            <option value={RepositoryOrderField.STARGAZERS}>Stargazers</option>
                                            <option value={RepositoryOrderField.CREATED_AT}>Created at</option>
                                            <option value={RepositoryOrderField.PUSHED_AT}>Pushed at</option>
                                        </select>
                                    </div>
                                    {
                                        user.repositories?.edges && <Repositories repositories={user?.repositories?.edges} />
                                    }
                                </div>
                            </div>
                        )
                        : error && (
                            <div className="flex-1 h-full flex justify-center mt-40">
                                <div className="flex flex-col items-center mb-8">
                                    {/* <div className="mt-4 text-gray-600">User name <span className="font-mono text-gray-600 font-bold">{userLogin}</span> does not exist.</div> */}
                                    <div className="mt-4 text-gray-600"><span className="text-red-600">Error: </span>{error.message}</div>
                                </div>
                            </div>
                        )
            }
        </div >
    )
}