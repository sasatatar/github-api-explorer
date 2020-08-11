import React from 'react';

let SUGGESTIONS = [
    'getify',
    'drboolean',
    'gaearon',
    'kentcdodds',
    'chriscoyier'
]

export const Default: React.FC<{}> = () => {
    return (
        <div className="flex-1 h-full flex items-center justify-center">
            <div className="mb-20 flex flex-col items-center">
                <h1 className="text-2xl text-gray-800 font-bold mb-2">Welcome!</h1>
                <p>To get started, use the search field above or select one of the suggestions:</p>
                <ul className="list-decimal">
                    {
                        SUGGESTIONS.map((login) => {
                            return (
                                <li
                                    key={login}
                                >
                                    <a
                                        href={`/${login}`}
                                        className="cursor-pointer text-blue-600 hover:underline"
                                    >
                                        {login}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <p className="mt-10">
                    <span>Demo by </span>
                    <a
                        href='/sasatatar'
                        className="cursor-pointer text-blue-600 hover:underline"
                    >
                        Sasha Tatar
                    </a>
                </p>
            </div>
        </div>
    )
}
