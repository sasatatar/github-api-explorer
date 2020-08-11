import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import client from './graphql/client';
import { Header } from './Header';
import { Default } from './routes/default';
import { Profile } from './routes/profile';

render(
    <ApolloProvider client={client}>
        <Router>
            <Header />
            <Switch>
                <Route path="/:userLogin">
                    <Profile />
                </Route>
                <Route path="*">
                    <Default />
                </Route>
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

