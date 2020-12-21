import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserPage = ({ username }) => {

    const [tasks, setTasks] = useState([]);
    const [desc, setDesc] = useState([]);

    const taskDescription = desc.map( task => 
        <li key={desc.indexOf(task)}>{task}</li> 
    );


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

    useEffect(() => {
        console.log(`hi, tasks triggered this.`);
        for (let i = 0; i < tasks.length; i++){
            axios.get(tasks[i])
            .then( res => {
                console.log(res.data.description);
                console.log(`printed task ${i}.`);
                setDesc(prevDesc => [...prevDesc, res.data.description]);
            })
        }
    }, [tasks]);


    return (
        <div>
            <h1>{username}</h1>
            {desc.length > 0 ?
                taskDescription :
                <p>You have no tasks! Click to add.</p>
            }
        </div>
    )
}

export default UserPage;