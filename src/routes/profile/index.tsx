import React from 'react';
import { useParams } from 'react-router-dom';

export const ProfilePage: React.FC<{}> = () => {

    let { userLogin } = useParams();

    return (
        <div>
            <h3>Profile page</h3>
            <p>{userLogin}</p>
        </div>
    )
}