import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserPage = ({ username }) => {

    const [taskUrls, setTaskUrls] = useState([]);
    const [tasks, setTasks] = useState([]);

    const taskDescriptions = tasks.map( task => 
        <li key={tasks.indexOf(task)}>{task}</li> 
    );

    useEffect(() => {
        const getUserAPI = () => {
            axios.get(`http://localhost:8000/users/` + username)
            .then(res => {
                setTaskUrls(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            });
        };
        getUserAPI();
    }, []);

    useEffect(() => {
        for (let i = 0; i < taskUrls.length; i++){
            axios.get(taskUrls[i])
            .then( res => {
                setTasks(prevTasks => [...prevTasks, res.data.description]);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [taskUrls]);

    return (
        <div>
            <h1>{username}</h1>
            {tasks.length > 0 ?
                taskDescriptions :
                <p>You have no tasks! Click to add.</p>
            }
        </div>
    )
}

export default UserPage;