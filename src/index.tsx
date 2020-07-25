import React, { useState } from 'react';
import { render } from 'react-dom';


const Application: React.FC<{}> = () => {

    const [query, setQuery] = useState('');

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-5xl text-blue-500 font-sans">Hello world!</h1>
                <input
                    className="p-2 m-1 border-gray-400 border w-1/6"
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    placeholder="GitHub username"
                />
                <button className="btn btn-blue">Search</button>
            </div>
        </div>
    )
};

render(<Application />, document.getElementById('root'));