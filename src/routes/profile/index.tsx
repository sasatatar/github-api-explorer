import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const QUERY_REPOS = gql`
    query Repos($cursor: String, $orderBy: RepositoryOrder, $login: String!, $pageSize: Int=5){
        user(login: $login) {
            login,
            email,
            name,
            url,
            avatarUrl(size: 100),
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

    let { data, loading, error } = useQuery(
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

    console.log(data);

    return (
        <div>
            <h3>Profile page</h3>
            <p>{userLogin}</p>
        </div>
    )
}