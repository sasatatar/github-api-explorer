import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '~components/LoadingSpinner';
import { ProfileInfo } from './ProfileInfo';
import { Repositories } from './Repositories';
import { UserProfile, UserProfileVariables, UserProfile_user } from '~__generated__/UserProfile';

const QUERY_USER = gql`
    query UserProfile($login: String!){
        user(login: $login) {
            id
            login
            email
            name
            url
            bio
            avatarUrl(size: 200)
        }
    }
`;

export const Profile: React.FC<{}> = () => {

    let { userLogin } = useParams();
    let { data, loading, error } = useQuery<UserProfile, UserProfileVariables>(QUERY_USER, {
        variables: {
            login: userLogin
        }
    });

    let user: UserProfile_user | null = data?.user || null;

    return (

        <div className="max-w-4xl mx-auto sm:w-full flex-1 flex flex-row overflow-hidden">
            {
                loading
                    ? (
                        <div className="flex-1 h-full flex items-center justify-center">
                            <div className="flex flex-col items-center mb-8">
                                <LoadingSpinner className="h-16 w-16" />
                                <div className="mt-4 text-gray-600">Loading user data...</div>
                            </div>
                        </div>
                    )
                    : error && (
                        <div className="flex-1 h-full flex justify-center mt-40">
                            <div className="flex flex-col items-center mb-8">
                                <div className="mt-4 text-gray-600"><span className="text-red-600">Error: </span>{error.message}</div>
                            </div>
                        </div>
                    )
            }
            <div className={`w-full flex-row flex-1 ${user ? 'flex' : 'hidden'}`}>
                <ProfileInfo user={user} />
                <div className="flex flex-col flex-1 py-4 pl-4">
                    <Repositories userLogin={userLogin} />
                </div>
            </div>
        </div >
    )
}