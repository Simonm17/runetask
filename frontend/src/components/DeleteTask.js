import React from 'react';
import axios from 'axios';


const DeleteTask = ({ taskUrl, triggerToggle, setMsg }) => {
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
            return axios(config)
            .then(
                setMsg('Item deleted!')
            )
            .then(res => {
                console.log(JSON.stringify(res.data));
                triggerToggle();
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