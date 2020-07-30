import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Home } from './routes/home';
import { ProfilePage } from './routes/profile';
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
        <SearchBox />
        <Router>
            <Switch>

                {/* <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8"> */}

                {/* </div> */}

                {/* <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/:userLogin">
                    <ProfilePage />
                </Route>
                <Route path="*">
                    <div>
                        <h3>The page does not exist</h3>
                        <Link to="/">Home</Link>
                    </div>
                </Route> */}
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);