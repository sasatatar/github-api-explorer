import React from 'react';
import { Repos_user_repositories_nodes } from '~__generated__/Repos';

export const Repositories: React.FC<{ repositories: (Repos_user_repositories_nodes | null)[] | null }> = ({ repositories }) => {
    return (
        <ul className="flex flex-row flex-wrap justify-between">
            {
                repositories && repositories.map((node: Repos_user_repositories_nodes | null) => {
                    return node && (
                        <li key={node.url} className="repo_card px-3 py-2 my-2 border border-gray-400 rounded-md">
                            <a href={node.url} target="blank"
                                className="text-blue-600 font-semibold text-xs hover:underline"
                            >{node.name}</a>
                            <p className="my-2 text-xs">{node.description}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}