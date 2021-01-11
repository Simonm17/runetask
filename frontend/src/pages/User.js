import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CreateTask from '../components/CreateTask';
import EditTask from '../components/EditTask';
import DeleteTask from '../components/DeleteTask';
import CompleteTask from '../components/CompleteTask';


const UserPage = ({ username, authUser }) => {

    const token = localStorage.getItem('token');

    const [taskUrls, setTaskUrls] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [msg, setMsg] = useState('');
    
    function clearMsg(){
        return setMsg('');
    }

    useEffect(() => {
        if (token == null) {
            setMsg('');
        }
    }, [authUser]);

    // used for triggering getUserAPI() after CUD requests.
    const [toggle, setToggle] = useState(true);
    const triggerToggle = () => {
        setToggle(!toggle);
    }

    // note: MAKE SURE USER IS AUTHENTICATED AND EQUALS OBJECT OWNER TO DISPLAY BUTTONS
    // ✓ button is a toggle; saves Task.completed field as true or false, indicated by regular or crossed-out text.
    // x button is a toggle; it brings out the confirm & cancel buttons. Once clicked, x button disappears.
    // confirm button triggers Task.delete() via post request.
    // cancel button resets buttons and returns x button.

    const getTaskInfo = tasks.map( task => {
            if (token && authUser === username.match.params.user) {
                return <li key={tasks.indexOf(task)}>
                    <EditTask setMsg={setMsg} taskUrl={task.url} description={task.description} triggerToggle={triggerToggle}/> 

                    <CompleteTask taskUrl={task.url} taskStatus={task.completed} triggerToggle={triggerToggle}/><button>&times;</button>
                    <DeleteTask setMsg={setMsg} taskUrl={task.url} triggerToggle={triggerToggle}/><button onClick={triggerToggle}>cancel</button>
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
            axios.get(`http://localhost:8000/users/` + username.match.params.user)
            .then(res => {
                setTaskUrls(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            });
        };
        getUserAPI();
    }, [toggle]);

    useEffect(() => {
        // Initialize with empty array so array doesn't
        // merge on top of already added states when using setTasks.
        console.log(`UseEffect triggered by taskUrls.`);
        setTasks([]);
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
    // only triggered when change in returned urls array by GET for users list.
    }, [taskUrls]);

    return (
        <User>
            
            {username.match.params.user &&
                <h1>{username.match.params.user}'s tasks</h1>
            }
            {msg && 
                <Messages>
                    <p className="msg-text">{msg} <span onClick={clearMsg}>&times;</span></p>
                </Messages>
            }
            {token && authUser === username.match.params.user && 
                <CreateTask setMsg={setMsg} triggerToggle={triggerToggle}/>
            }

            {tasks.length > 0 ?
                <ul className="task-list">{getTaskInfo}</ul>
                :
                <p>{token && authUser === username.match.params.user ?
                    'You have no tasks!' : `${username.match.params.user} currently has no task.`
                    }
                </p>
            }
        </User>
    )
}

const User = styled.div`
    h1 {
        text-align: center;
    }
    .task-list {
        border: 1px solid yellow;
        display: inline-block;
        max-width: 80%;
        margin-left: 10vw;
        margin-right: auto;
    }
`

const Messages = styled.div`
    .msg-text {
        display: inline-block;
        margin-left: 15vw;
        span {
            &:hover {
                cursor: pointer;
            }
        }
    }
`;

export default UserPage;