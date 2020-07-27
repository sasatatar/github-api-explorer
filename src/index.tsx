import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Home } from './routes/home';
import { ProfilePage } from './routes/profile';

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
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/:userLogin">
                    <ProfilePage />
                </Route>
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);