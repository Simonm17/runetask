import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditTask = ({ taskUrl, description, triggerToggle }) => {

    const [desc, setDesc] = useState(description);

    const token = localStorage.getItem('token');
    const config = {
        method: 'put',
        url: taskUrl,
        headers: {
            Authorization: 'Token ' + token
        },
        data: {
            'description': desc
        }
    }

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
                triggerToggle();
            })
        }
        return console.log(` another key was pressed.`)
    }

    return (
        <form>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} onKeyPress={keyPressHandler}/>
        </form>
    )
}

export default EditTask;