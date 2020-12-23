import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteTask from '../components/DeleteTask';

const UserPage = ({ username }) => {

    const [taskUrls, setTaskUrls] = useState([]);
    const [tasks, setTasks] = useState([]);

    // note: MAKE SURE USER IS AUTHENTICATED AND EQUALS OBJECT OWNER TO DISPLAY BUTTONS
    // ✓ button is a toggle; saves Task.completed field as true or false, indicated by regular or crossed-out text.
    // x button is a toggle; it brings out the confirm & cancel buttons. Once clicked, x button disappears.
    // confirm button triggers Task.delete() via post request.
    // cancel button resets buttons and returns x button.

    const getTaskInfo = tasks.map( task => {
            if (username) {
                return <li key={tasks.indexOf(task)}>
                    {task.description} 
                    
                    <button>✓</button><button>&times;</button>
                    <DeleteTask taskUrl={taskUrls[task]} /><button>cancel</button>
                </li> 
            }
            else {
                return <li key={tasks.indexOf(task)}>
                    {task.description}
                </li>
            }
        }
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
                console.log('PRINTING:');
                console.log(res.data);
                setTasks(prevTask => [...prevTask, res.data]);
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
                <ul> {getTaskInfo} </ul>
                :
                <p>You have no tasks! Click to add.</p>
            }
        </div>
    )
}

export default UserPage;