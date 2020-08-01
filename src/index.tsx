import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Profile } from './routes/profile';
import { SearchBox } from './SearchBox';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
});

render(
    <ApolloProvider client={client}>
        <Router>
            <SearchBox />
            <Switch>
                <Route path="/:userLogin">
                    <Profile />
                </Route>
                <Route path="*">
                    <div>
                        <h3>The page does not exist</h3>
                        <Link to="/">Home</Link>
                    </div>
                </Route>
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);