import React from 'react';
import { render } from 'react-dom';

const Application: React.FC<{}> = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-5xl text-blue-500 font-sans">Hello world!</h1>
            </div>
            <button className="btn btn-blue">Test</button>
        </div>
    )
};

render(<Application />, document.getElementById('root'));