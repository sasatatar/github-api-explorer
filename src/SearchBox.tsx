import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { User, UserVariables, User_user } from '~/__generated__/User';
import { Link } from 'react-router-dom';
import { useDebounce } from '~/util/useDebounce';
import { useLocalStorage } from '~/util/useLocalStorage';
import { Icon } from '~components/Icon';

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


export const SearchBox: React.FC<{}> = () => {

    const [login, setLogin] = useState('');
    let debouncedLogin = useDebounce(login, 500);
    let [isFocused, setIsFocused] = useState(false);
    let [searchHistory, updateSearchHistory] = useSearchHistory();

    const [getUser, { loading, data }] = useLazyQuery<User, UserVariables>(USER_QUERY);

    let [user, setUser] = useState(data?.user);
    if (user) setIsFocused(true);

    useEffect(() => {
        if (!debouncedLogin) return;
        getUser({ variables: { login: debouncedLogin } });
    }, [debouncedLogin]);

    function onSelectUser(user: User_user) {
        updateSearchHistory(user);
        setUser(null);
        setIsFocused(false);
        setLogin('');
    }

    return (
        <div className="shadow-lg">
            <div className="bg-blue-800 border-b-4 border-blue-400">
                <div className="max-w-4xl mx-auto sm: w-full flex flex-row items-center">
                    < div className="py-3 px-0 relative overflow-visible flex-1" >
                        <div
                            className={`py-1 px-2 w-1/3 bg-white rounded border-blue-400 border flex flex-row items-center`}
                        >
                            <input type="text"
                                className="text-lg outline-none w-full"
                                placeholder="GitHub username"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                //${isFocused ? '' : 'border-opacity-0'}
                                // onFocus={(e) => {
                                //     setIsFocused(true);
                                // }}
                                onBlur={(e) => {
                                    setTimeout(() => setIsFocused(false), 500);
                                }}
                            />
                            {/* <LoadingSpinner /> */}
                            <div className="ml-2">
                                {
                                    loading
                                        ? <LoadingSpinner className="h-5 w-5" />
                                        : <i className={`fas ${login ? 'fa-times' : 'fa-search'} w-5 text-lg text-gray-400 text-center hover:text-gray-600 lineheight-unset`}
                                            onClick={() => {
                                                setLogin('');
                                                setUser(null);
                                                setIsFocused(false);
                                            }}
                                        />
                                }
                            </div>
                        </div>
                        {
                            isFocused && (
                                user
                                    ? <SearchResult user={data?.user || null} onSelectUser={onSelectUser} />
                                    : <SearchHistory searchHistory={searchHistory} onSelectUser={onSelectUser} />
                            )
                        }
                    </div >
                    <div>
                        <span className="text-xl text-blue-400 mr-2">GitHub <span className="font-bold text-white">explorer</span></span>
                        <i className="fab fa-github text-blue-400 text-xl" />
                    </div>
                </div >
            </div >
        </div>
    );
}

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={`circle animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" />
        </svg>
        // <svg className={`animate-spin text-gray-600 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //     {/* <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> */}
        //     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        // </svg>
    )
}

const SearchHistory: React.FC<{
    searchHistory: Array<User_user>,
    onSelectUser: (user: User_user) => void
}> = ({ searchHistory, onSelectUser }) => {
    return (
        <div className={`absolute w-1/2 h-1/2 shadow-md border rounded-md bg-white transition-opacity`}>
            <div className="p-5">
                <h1 className="text-xl mb-3">Search history</h1>
                <React.Fragment>
                    {
                        searchHistory.length > 0
                        && (
                            <ul>
                                <React.Fragment>
                                    {searchHistory.map((user: User_user) => (
                                        <li
                                            onClick={() => onSelectUser(user)}
                                        >
                                            <img src={user.avatarUrl} alt={user.name || ''} className="m-2" />
                                            <div>{user.name}</div>
                                            <span>{user.login}</span>
                                            <div>{user.email}</div>
                                            <a href={user.url}>Go to github page</a>
                                        </li>
                                    ))}
                                </React.Fragment>
                            </ul>
                        )
                    }
                </React.Fragment>
            </div>
        </div>
    )
}

const SearchResult: React.FC<{
    user: User_user | null,
    onSelectUser: (user: User_user) => void
}> = ({ user, onSelectUser }) => {

    return (
        <div className={`absolute w-1/2 max-h-1/2 shadow-md border rounded-md bg-white transition-opacity`}>
            <div className="p-5">
                {
                    user
                        ? (
                            <div
                                onClick={() => {
                                    onSelectUser(user);
                                }}
                            >
                                <img src={user.avatarUrl} />
                                <div>{user.name}</div>
                                <span>{user.login}</span>
                                <div>{user.email}</div>
                                <a href={user.url}>Go to github page</a>
                            </div>
                        )
                        : <div>No matches</div>
                }
            </div>
        </div>
    )
}


function useSearchHistory() {
    let [searchHistory, saveSearchHistory] = useLocalStorage('search-history', []);

    return [
        searchHistory,
        (user: User_user) => {
            let newSearchHistory = searchHistory.filter((u: User_user) => u.login != user.login);
            newSearchHistory = [user, ...newSearchHistory].slice(10);

            if (searchHistory != newSearchHistory) {
                saveSearchHistory(newSearchHistory);
            }
        }
    ];
}
