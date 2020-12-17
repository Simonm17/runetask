import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserPage = ({ username }) => {

    const [tasks, setTasks] = useState('');


    useEffect(() => {
        const getUserAPI = () => {
            axios.get(`http://localhost:8000/users/` + username)
            .then(res => {
                console.log(res);

                setTasks(res.data.tasks);

            })
            .catch(err => {
                console.log(err);
            });
        };
        getUserAPI();
        console.log(tasks);
    }, []);


    return (
        <div>
            <h1>{username}</h1>
            {tasks}
        </div>
    )
}

export default UserPage;