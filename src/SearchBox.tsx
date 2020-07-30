import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { User, UserVariables, User_user } from '~/__generated__/User';
import { Link } from 'react-router-dom';
import { useDebounce } from '~/util/useDebounce';
import { useLocalStorage } from '~/util/useLocalStorage';

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

    const [query, setQuery] = useState('');
    let login = useDebounce(query, 500);
    let [isOpen, setIsOpen] = useState(false);
    let [searchHistory, updateSearchHistory] = useSearchHistory();

    function onSelectUser(user: User_user) {
        updateSearchHistory(user);
        setIsOpen(false);
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
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                //${isOpen ? '' : 'border-opacity-0'}
                                onFocus={(e) => {
                                    setIsOpen(true);
                                }}
                                onBlur={(e) => {
                                    setTimeout(() => setIsOpen(false), 300);
                                }}
                            />
                            <div className="ml-2">
                                <i className={`fas ${query ? 'fa-times' : 'fa-search'} w-5 text-lg font-light text-gray-400 text-center hover:text-gray-600 lineheight-unset`}
                                    onClick={() => {
                                        setQuery('');
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                        {
                            isOpen && (
                                login
                                    ? <SearchResult login={login} onSelectUser={onSelectUser} />
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
                {
                    searchHistory.length > 0
                    && (
                        <ul>
                            <React.Fragment>
                                {searchHistory.map((user: User_user) => (
                                    <li
                                        onClick={() => onSelectUser(user)}
                                        key={user.login}
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
            </div>
        </div>
    )
}

const SearchResult: React.FC<{
    login: string,
    onSelectUser: (user: User_user) => void
}> = ({ login, onSelectUser }) => {

    let { loading, error, data } = useQuery<User, UserVariables>(USER_QUERY, { variables: { login } });
    // const [getUser, { loading, error, data }] = useLazyQuery<User, UserVariables>(USER_QUERY);
    if (error) console.error(error);

    let user = data?.user;

    return (
        <div className={`absolute w-1/2 max-h-1/2 shadow-md border rounded-md bg-white transition-opacity`}>
            <div className="p-5">
                {
                    loading
                        ? (
                            <div><LoadingSpinner /></div>
                        )
                        : user
                            ? (
                                <div
                                    onClick={() => {
                                        user && onSelectUser(user);
                                    }}
                                >
                                    <img src={user.avatarUrl} />
                                    <div>{user.name}</div>
                                    <span>{user.login}</span>
                                    <div>{user.email}</div>
                                    <a href={user.url}>Go to github page</a>
                                </div>
                            )
                            : <div>No matches found</div>
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
            newSearchHistory = [user, ...newSearchHistory].slice(0, 10);

            if (searchHistory != newSearchHistory) {
                saveSearchHistory(newSearchHistory);
            }
        }
    ];
}
