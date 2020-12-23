import React from 'react';
import axios from 'axios';


const DeleteTask = ({ taskUrl }) => {
    const token = localStorage.getItem('token');

    const handleDelete = () => {
        if (token) {
            // FIX AXIOS POST PARAMETERS
            return axios.post(taskUrl, token)
            .then(res => {
                console.log(res);
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