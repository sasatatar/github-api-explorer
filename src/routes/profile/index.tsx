import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { Repos, ReposVariables } from '~__generated__/Repos';
import { UserProfile } from './UserProfile';
import { Repositories } from './Repositories';
import { RepositoryOrderField, OrderDirection, RepositoryOrder } from '~__generated__/globalTypes';

const repositories = gql`
    fragment Repositories on User {
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
`

const QUERY_REPOS = gql`
    query Repos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=10){
        user(login: $login) {
            login
            email
            name
            url
            bio
            avatarUrl(size: 200)
            ...Repositories
        }
    }
    ${repositories}
`;

const FETCH_MORE_REPOS = gql`
    query MoreRepos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=10){
        user(login: $login) {
            ...Repositories
        }
    }
    ${repositories}
`;


export const Profile: React.FC<{}> = () => {

    let { userLogin } = useParams();
    let orderBy: RepositoryOrder | null = null;
    let [orderField, setOrderField] = useState<RepositoryOrderField | ''>('');
    // TODO: implement sortDirection UI
    let [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC);
    // let [loadMore, setLoadMore] = useState<boolean>(false);

    orderBy = orderField
        ? {
            field: orderField,
            direction: orderDirection
        }
        : null;

    let { data, loading, error, fetchMore } = useQuery<Repos, ReposVariables>(
        QUERY_REPOS,
        {
            variables: {
                login: userLogin,
                orderBy
            },
            notifyOnNetworkStatusChange: true
        },
    );

    let user = data?.user;
    let repositories = user?.repositories;
    let pageInfo = repositories?.pageInfo;

    function onLoadMore() {
        fetchMore({
            query: FETCH_MORE_REPOS,
            variables: { cursor: pageInfo?.endCursor, login: userLogin },
            // updateQuery: ({ user }: Repos, { fetchMoreResult }: { fetchMoreResult: Repos }) => {
            updateQuery: (previousQueryResult: Repos, options: {
                fetchMoreResult?: Repos | undefined;
                variables?: ReposVariables | undefined;
            }): Repos => {

                let user = previousQueryResult.user;
                let newUser = options?.fetchMoreResult?.user;

                if (!newUser) return previousQueryResult;

                return {
                    user: {
                        ...user,
                        ...newUser,
                        repositories: {
                            ...newUser.repositories,
                            nodes: [
                                ...user?.repositories.nodes,
                                ...newUser.repositories.nodes
                            ],
                            pageInfo: {
                                __typename: newUser.repositories.pageInfo.__typename,
                                endCursor: newUser.repositories?.pageInfo?.endCursor || null,
                                hasNextPage: newUser.repositories?.pageInfo?.hasNextPage || false
                            }
                        }
                    }

                }
            }
        })
    }

    if (error) console.error(error);


    return (

        <div className="max-w-4xl mx-auto sm:w-full flex-1 flex flex-row overflow-hidden">

            {
                loading && !user
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
                            <div className="w-full flex flex-row flex-1">
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
                                    <div className="flex-1 overflow-y-scroll flex flex-col items-center">
                                        {
                                            repositories && <Repositories repositories={repositories.nodes} />
                                        }
                                        {
                                            pageInfo?.hasNextPage && (
                                                <React.Fragment>
                                                    <button
                                                        className="self-center bg-blue-400 hover:bg-blue-600 rounded py-1 px-2 text-white text-sm mb-1 h-8 focus:outline-none"
                                                        onClick={onLoadMore}
                                                    // onClick={() => setLoadMore(!loadMore)}
                                                    >
                                                        {
                                                            loading
                                                                ? <LoadingSpinner className="w-4 inline-block mr-2 mb-1 text-white" />
                                                                : <i className="fas fa-chevron-down w-4 mr-2"></i>
                                                        }
                                                        <span>Load more</span>
                                                    </button>
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        : error && (
                            <div className="flex-1 h-full flex justify-center mt-40">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="mt-4 text-gray-600"><span className="text-red-600">Error: </span>{error.message}</div>
                                </div>
                            </div>
                        )
            }
        </div >
    )
}