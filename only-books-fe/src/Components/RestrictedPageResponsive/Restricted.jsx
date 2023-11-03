/* eslint-disable no-unused-vars */
import React from 'react';

const Restricted = () => {
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
            <div>Acceso restringido en dispositivos móviles</div>
        </div>
    );
}

export default Restricted;
