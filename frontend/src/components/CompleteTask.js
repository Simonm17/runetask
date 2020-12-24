import React from 'react';
import axios from 'axios';


const CompleteTask = ({taskUrl, taskStatus, triggerToggle}) => {

    const token = localStorage.getItem('token');

    const config = {
        method: 'put',
        url: taskUrl,
        headers: {
            Authorization: 'Token ' + token 
        },
        data: {
            'completed': !taskStatus
        }
    }

    const buttonStyle = {
        textDecoration: 'line-through',
    }

    const handleComplete = () => {
        return axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
                triggerToggle();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            {taskStatus ? 
                <button style={{textDecoration: 'line-through'}} onClick={handleComplete}>✓</button>
                :
                <button onClick={handleComplete}>✓</button>
            }
        </>
    )
}

export default CompleteTask;