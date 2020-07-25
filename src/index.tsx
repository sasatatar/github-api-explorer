import React, { useState } from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});

const Application: React.FC<{}> = () => {

    const [query, setQuery] = useState('');

    async function handleOnClick() {
        client
            .query({
                query: gql`
                    query { 
                        user(login: "sasatatar") {
                            login,
                            email,
                            name,
                            url,
                            avatarUrl(size: 100)
                        }
                    }
                `
            })
            .then(result => console.log(result));
    }

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-5xl text-blue-500 font-sans">Hello world!</h1>
                <input
                    className="p-2 m-1 border-gray-400 border w-1/6"
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    placeholder="GitHub username"
                />
                <button className="btn btn-blue" onClick={handleOnClick}>Search</button>
            </div>
        </div>
    )
};

render(<Application />, document.getElementById('root'));