import React, { useState } from 'react';
import { RepositoryOrder, RepositoryOrderField, OrderDirection } from '~__generated__/globalTypes';
import { gql, useQuery } from '@apollo/client';
import { RepositoryDataVariables, RepositoryData, RepositoryData_user_repositories_nodes } from '~__generated__/RepositoryData';
import { LoadingSpinner } from '~components/LoadingSpinner';

const QUERY_REPOSITORIES = gql`
    query RepositoryData($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=10){
        user(login: $login) {
            id
            repositories(first: $pageSize, orderBy: $orderBy, after: $cursor) {
                nodes {
                    id
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

export const Repositories: React.FC<{ userLogin: string }> = ({ userLogin }) => {

    let orderBy: RepositoryOrder | null = null;
    let [orderField, setOrderField] = useState<RepositoryOrderField | ''>('');
    // TODO: implement sortDirection UI
    let [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC);

    orderBy = orderField
        ? {
            field: orderField,
            direction: orderDirection
        }
        : null;

    let { data, loading, error, fetchMore } = useQuery<RepositoryData, RepositoryDataVariables>(
        QUERY_REPOSITORIES,
        {
            variables: {
                login: userLogin,
                orderBy: orderBy
            },
            notifyOnNetworkStatusChange: true
        }
    )



    let repositories = data?.user?.repositories.nodes || null;
    let pageInfo = data?.user?.repositories.pageInfo;

    if (error) console.log(error);

    function onLoadMore() {
        fetchMore({
            variables: { cursor: pageInfo?.endCursor, login: userLogin },
            // updateQuery: ({ user }: Repos, { fetchMoreResult }: { fetchMoreResult: Repos }) => {
            updateQuery: (previousQueryResult: RepositoryData, options: {
                fetchMoreResult?: RepositoryData | undefined;
                variables?: RepositoryDataVariables | undefined;
            }): RepositoryData => {

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

    return (
        <React.Fragment>
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
                    loading && !repositories
                        ? (
                            <div className="flex flex-col flex-1 items-center justify-center text-gray-800">
                                <LoadingSpinner className="w-20 h-20 mb-2" />
                                <div>Loading repositories...</div>
                            </div>
                        )
                        : (
                            <React.Fragment>
                                <ul className="flex flex-row flex-wrap justify-between">
                                    {
                                        repositories && repositories.map((node: RepositoryData_user_repositories_nodes | null) => {
                                            return node && (
                                                <li key={node.id} className="repo_card px-3 py-2 my-2 border border-gray-400 rounded-md">
                                                    <a href={node.url} target="blank"
                                                        className="text-blue-600 font-semibold text-xs hover:underline"
                                                    >{node.name}</a>
                                                    <p className="my-2 text-xs">{node.description}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    pageInfo?.hasNextPage && (
                                        <button
                                            className="self-center bg-blue-400 hover:bg-blue-600 rounded py-1 px-2 text-white text-sm mb-1 focus:outline-none"
                                            onClick={onLoadMore}
                                        // onClick={() => setLoadMore(!loadMore)}
                                        >
                                            {
                                                loading
                                                    ? <LoadingSpinner className="w-4 inline-block mr-2 text-white" />
                                                    : <i className="fas fa-chevron-down w-4 mr-2"></i>
                                            }
                                            <span>Load more</span>
                                        </button>
                                    )
                                }
                            </React.Fragment>
                        )
                }
            </div>
        </React.Fragment>
    )
}