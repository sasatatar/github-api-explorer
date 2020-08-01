import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables } from '~__generated__/Repos';
import { UserProfile } from './UserProfile';
import { Repositories } from './Repositories';
import { RepositoryOrderField, OrderDirection, RepositoryOrder } from '~__generated__/globalTypes';

const QUERY_REPOS = gql`
    query Repos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=10){
        user(login: $login) {
            login
            email
            name
            url
            bio
            avatarUrl(size: 200)
            repositories(first: $pageSize, orderBy: $orderBy, after: $cursor) {
                nodes {
                    name
                    description
                    url
                }
                pageInfo {
                    endCursor
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

    let [cursor, setCursor] = useState<string | null>();
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
    let pageInfo = user?.repositories.pageInfo;

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
                                <div className="flex flex-col flex-1 py-4 pl-4">
                                    <div className="flex flex-row mb-2 items-baseline">
                                        <h1 className="text-gray-800 text-lg font-semibold">Repositories</h1>
                                        <label className="ml-auto text-sm text-gray-800 mr-1">Order by</label>
                                        <select
                                            onChange={e => {
                                                let value = e.target.value as RepositoryOrderField;
                                                setOrderField(value);
                                            }}
                                            value={orderField} className="text-sm rounded-sm border"
                                        >
                                            <option value={''}>-</option>
                                            <option value={RepositoryOrderField.NAME}>Name</option>
                                            <option value={RepositoryOrderField.STARGAZERS}>Stargazers</option>
                                            <option value={RepositoryOrderField.CREATED_AT}>Created at</option>
                                            <option value={RepositoryOrderField.PUSHED_AT}>Pushed at</option>
                                        </select>
                                    </div>
                                    {
                                        user.repositories?.nodes && <Repositories repositories={user.repositories.nodes} />
                                    }
                                    <div className="flex-1" />
                                    <button
                                        className="self-center border border-gray-700 bg-blue-400 rounded py-1 px-2 text-white text-sm"
                                        onClick={() => {
                                            pageInfo && setCursor(pageInfo?.endCursor)
                                        }}
                                    >Load more</button>
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