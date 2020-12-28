import React from 'react';


const Logout = ({ setToken, setMessage }) => {
    
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setMessage([`You have logged out.`]);
    }

    return (
        <>
            <button onClick={handleLogoutClick}>Logout</button>
        </>
    )
}

export default Logout;