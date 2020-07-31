import React from 'react';

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={`circle animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" />
        </svg>
    )
}