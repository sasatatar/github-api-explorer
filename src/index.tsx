import React, { useState } from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useLazyQuery } from '@apollo/client';
import { User, UserVariables } from "./__generated__/User";

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});

const USER_QUERY = gql`
    query User ($login: String!) { 
        user(login: $login) {
            login,
            email,
            name,
            url,
            avatarUrl(size: 100)
        }
    }
`;

const Application: React.FC<{}> = () => {

    const [login, setLogin] = useState('');

    const [getUser, { loading, data }] = useLazyQuery<User, UserVariables>(USER_QUERY);

    async function handleOnClick() {
        getUser({ variables: { login } });
    }


    return (
        <div>
            <div className="min-h-screen flex flex-col items-center">
                <h1 className="text-5xl text-blue-500 font-sans">Hello world!</h1>
                <input
                    className="p-2 m-1 border-gray-400 border w-1/6"
                    type="text"
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value);
                    }}
                    placeholder="GitHub username"
                />
                <button className="btn btn-blue" onClick={handleOnClick}>Search</button>
                {
                    data && data.user
                    && (
                        <div className="m-1">
                            <h4>{data.user.name}</h4>
                            <img src={data.user.avatarUrl} />
                        </div>
                    )
                }
                {
                    loading && (
                        <p>Loading...</p>
                    )
                }

            </div>
        </div>
    )
};

render(
    <ApolloProvider client={client}>
        <Application />
    </ApolloProvider>,
    document.getElementById('root')
);