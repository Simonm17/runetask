import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditTask = ({ taskUrl, description, triggerToggle, setMsg }) => {

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
        if (token && e.key === 'Enter' && e.target.value.length > 0) {
            e.preventDefault();
            return axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
                setMsg('saved!');
                triggerToggle();
            })
            .catch(err => {
                console.log(err);
            })
        } else if (token && e.key === 'Enter' && e.target.value.length === 0) {
            return setMsg('You must type at least one character.')
        }
        return console.log(` another key was pressed.`)
    }

    return (
        <>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} onKeyPress={keyPressHandler}/>
        </>
    )
}

export default EditTask;