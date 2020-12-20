import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserPage = ({ username }) => {

    const [tasks, setTasks] = useState([]);

    const taskDetail = tasks.map( task => <li key={tasks.indexOf(task)}>{task}</li> );


    useEffect(() => {
        const getUserAPI = () => {
            axios.get(`http://localhost:8000/users/` + username)
            .then(res => {
                console.log(res);
                setTasks(res.data.tasks);
                console.log(`printing tasks: ${tasks}.`);
                console.log(typeof tasks + '<- type');
            })
            .catch(err => {
                console.log(err);
            });
        };
        getUserAPI();
    }, []);

    return (
        <div>
            <h1>{username}</h1>
            {tasks.length > 0 ?
                taskDetail :
                <p>You have no tasks! Click to add.</p>
            }
        </div>
    )
}

export default UserPage;