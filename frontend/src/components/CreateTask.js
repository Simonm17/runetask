import React, { useState } from 'react';
import axios from 'axios';


const CreateTask = ({ triggerToggle }) => {

    const [value, setValue] = useState('');

    const token = localStorage.getItem('token');
    const config = {
        method: 'post',
        url: 'http://localhost:8000/tasks/',
        headers: {
            Authorization: 'Token ' + token
        },
        data: {
            'description': value,
            'created_by': '1'
        }
    }

    const handleSubmit = () => {
        axios(config)
        .then(res => {
            console.log(JSON.stringify(res.data))
            triggerToggle();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Add new task" 
                onChange={e => setValue(e.target.value)} 
                value={value}
            />
            <input type="submit" value="Create" />
        </form>
    );
}

export default CreateTask;