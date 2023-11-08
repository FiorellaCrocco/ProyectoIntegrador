import React from 'react';

const Avatar = ({ name }) => {
    const initials = name
        .split(' ')
        .map((part) => part[0].toUpperCase())
        .join('');

    return <div className="avatar">{initials}</div>;
};

export default Avatar;
