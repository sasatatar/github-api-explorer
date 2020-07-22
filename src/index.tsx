import React from 'react';
import { render } from 'react-dom';

const Application: React.FC<{}> = () => {
    return (
        <h1>Hello world</h1>
    )
};

render(<Application />, document.getElementById('root'));