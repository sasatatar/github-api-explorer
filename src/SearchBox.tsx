import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { User, UserVariables, User_user } from '~/__generated__/User';
import { Link } from 'react-router-dom';
import { useDebounce } from '~/util/useDebounce';
import { useLocalStorage } from '~/util/useLocalStorage';
import { LoadingSpinner } from '~components/LoadingSpinner';

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
                                    setTimeout(() => setIsOpen(false), 250);
                                }}
                                autoComplete="off"
                            />
                            <div className="ml-2">
                                <i className={`fas ${query ? 'fa-times' : 'fa-search'} w-5 text-sm font-thin text-gray-400 text-center hover:text-gray-600 lineheight-unset`}
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


const UserCard: React.FC<{ user: User_user }> = ({ user }) => {
    return (
        <div className="w-full flex flex-row">
            <img src={user.avatarUrl} alt={user.name || ''}
                className="mr-4 mt-1 w-16 h-16 rounded"
            />
            <div
                className="text-sm flex-1"
            >
                <div className="text-lg font-bold text-gray-700">{user.name}</div>
                <div className="text-gray-600 w-full flex-1 flex flex-row flex-wrap">
                    <p className="whitespace-no-wrap">
                        <i className="fab fa-github-square mr-1"></i>
                        <span className="mr-2">{user.login}</span>
                    </p>
                    <p className="flex-1 whitespace-no-wrap">
                        <i className="far fa-envelope text-gray-600 mr-1"></i>
                        <span className="flex-1">{user.email || '-'}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const SearchHistory: React.FC<{
    searchHistory: Array<User_user>,
    onSelectUser: (user: User_user) => void
}> = ({ searchHistory, onSelectUser }) => {
    return (
        <div className={`search_menu absolute w-1/2 shadow-md border rounded-md bg-white transition-opacity`}>
            <div className="pl-3 pr-2 py-3 h-full flex flex-col">
                <h1 className="text-l text-gray-700 mb-2">Search history</h1>
                <div className="overflow-y-scroll overflow-x-hidden flex-1">
                    {
                        searchHistory.length > 0
                        && (
                            <ul>
                                <React.Fragment>
                                    {searchHistory.map((user: User_user) => (
                                        <li
                                            onClick={() => onSelectUser(user)}
                                            key={user.login}
                                            className="flex flex-row py-2 pl-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            <UserCard user={user} />
                                        </li>
                                    ))}
                                </React.Fragment>
                            </ul>
                        )
                    }
                </div>
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
        <div className={`absolute w-1/2 shadow-md border rounded-md bg-white transition-opacity`} style={{ height: 141 }}>
            <div className="pl-3 pr-2 py-3 h-full flex flex-col">
                <h1 className="text-l text-gray-700 mb-2">Search result</h1>
                {
                    loading
                        ? (
                            <div className="flex-1 flex items-center justify-center"><LoadingSpinner className="h-10 w-10" /></div>
                        )
                        : user
                            ? (
                                <div
                                    onClick={() => {
                                        user && onSelectUser(user);
                                    }}
                                    className="flex flex-row py-2 pl-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    <UserCard user={user} />
                                </div>
                            )
                            : <div className="flex-1 flex items-center justify-center text-gray-500 text-sm align-middle mb-4">No matches found</div>
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
