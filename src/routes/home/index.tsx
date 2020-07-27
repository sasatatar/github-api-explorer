import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { User, UserVariables } from '../../__generated__/User';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../util/useDebounce';

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


export const Home: React.FC<{}> = () => {

    const [login, setLogin] = useState('');

    const [getUser, { loading, data }] = useLazyQuery<User, UserVariables>(USER_QUERY);

    async function handleOnClick() {
        getUser({ variables: { login } });
    }

    let debouncedLogin = useDebounce(login, 500);

    useEffect(() => {
        if (!debouncedLogin) return;
        getUser({ variables: { login: debouncedLogin } });
    }, [debouncedLogin])

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
                        console.log('setting user....')
                    }}
                    placeholder="GitHub username"
                />
                <button className="btn btn-blue" onClick={handleOnClick}>Search</button>
                {
                    !loading && data?.user
                    && (
                        <div className="m-1">
                            <h4>{data.user.name}</h4>
                            <img src={data.user.avatarUrl} />
                            <Link to={`/${data.user.login}`}>{data.user.name}</Link>
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
}