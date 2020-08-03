import React from 'react';
import { UserProfile_user } from '~__generated__/UserProfile';

export const ProfileInfo: React.FC<{ user: UserProfile_user | null }> = ({ user }) => {
    return user && (
        <div className="w-1/4 py-5">
            <div className="w-full h-full border-r">
                <div className="w-full flex flex-col items-end pr-3">
                    <img src={user.avatarUrl} alt={user.name || ''}
                        className="mb-2 w-48 h-48 rounded shadow-md"
                    />
                    <div
                        className="flex-1"
                    >
                        <div className="text-2xl font-bold text-gray-700 text-right">{user.name}</div>
                        <div className="text-md text-gray-600 w-full flex-1 flex flex-col items-end">
                            <p className="mt-2">
                                <a className="text-blue-500 hover:underline" href={user.url} target="blank">
                                    <i className="fab fa-github-square mr-1"></i>
                                    <span className="">{user.login}</span>
                                </a>
                            </p>
                            <p className="mt-2">
                                <i className="far fa-envelope text-gray-600 mr-1"></i>
                                <span className="flex-1 ">{user.email || '-'}</span>
                            </p>
                            <p className="mt-5 text-right text-sm">
                                {user.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}