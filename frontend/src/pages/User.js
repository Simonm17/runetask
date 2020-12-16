import React, { useState } from 'react';
import axios from 'axios';


const UserPage = ({ username }) => {

    const 

    const getUserAPI = () => {
        axios.get('http://localhost:8000/tasks/{username}/')
    }

    return (
        <div>

        </div>
    )
}

export default UserPage;