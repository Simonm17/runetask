import React from 'react';
import axios from 'axios';


const DeleteTask = ({ taskUrl, toggle }) => {
    const token = localStorage.getItem('token');

    const config = {
        method: 'delete',
        url: taskUrl,
        headers: {
            Authorization: 'Token ' + token 
        }
    }

    const handleDelete = () => {
        if (token) {
            // FIX AXIOS POST PARAMETERS
            return axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
                toggle();
            })
            .catch(err => {
                console.log(err);
            });
        }
        return console.log('no token!');
    }

    return (
        <button onClick={handleDelete}>
            confirm
        </button>
    )
}

export default DeleteTask;