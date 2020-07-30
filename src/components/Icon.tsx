import React from 'react';

export const Icon: React.FC<{ name: string, className?: string }> = ({ name, className }) => {
    return (
        <i className={`fas ${name} ${className || ''}`} />
    )
}