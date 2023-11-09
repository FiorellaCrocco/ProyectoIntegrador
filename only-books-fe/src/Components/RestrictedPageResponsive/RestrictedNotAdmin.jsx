/* eslint-disable no-unused-vars */
import React from 'react';

const RestrictedNotAdmin = () => {
    const centerDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Establece la altura de la vista completa
        color: 'red',
    };

    return (
        <div style={centerDivStyle}>
            <div>Acceso restringido solo para administradores</div>
        </div>
    );
}

export default RestrictedNotAdmin;
