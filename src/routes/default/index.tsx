import React from 'react';
import { Link } from "react-router-dom";

let SUGGESTIONS = [
    'getify',
    'DrBoolean',
    'gaearon',
    'ryanflorence',
    'kentcdodds',
    'chriscoyier'
]

export const Default: React.FC<{}> = () => {
    return (
        <div className="flex-1 h-full flex justify-center mt-10">
            <div className="mb-20 flex flex-col items-center text-gray-800">
                <h1 className="text-2xl text-blue-700 font-bold mb-8">Welcome!</h1>
                <p>To get started, use the search field above or select one of the suggestions:</p>
                <ul className="list-decimal mt-2">
                    {
                        SUGGESTIONS.map((login) => {
                            return (
                                <li
                                    key={login}
                                >
                                    <Link
                                        to={`/${login}`}
                                        className="cursor-pointer text-blue-600 hover:underline"
                                    >
                                        {login}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <p className="mt-10">
                    <span>Demo by </span>
                    <Link
                        to='/sasatatar'
                        className="cursor-pointer text-blue-600 hover:underline"
                    >
                        Sasha Tatar
                    </Link>
                </p>
            </div>
        </div>
    )
}
