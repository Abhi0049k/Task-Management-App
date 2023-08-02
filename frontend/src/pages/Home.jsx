import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css'
import axios from 'axios';
import Task from '../components/Task';

const Home = () => {
    const [name, setName] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [task, setTask] = useState({ task: '', desc: '' });
    const [list, setList] = useState(null)
    const navigate = useNavigate();
    const baseServerURI = 'https://zealous-wasp-hospital-gown.cyclic.cloud/todo'
    useEffect(() => {
        if (name == null || token == null) navigate('/login');
        fetchRender();
    }, []);

    const fetchRender = async () => {
        let res = await axios.get(baseServerURI, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status>=200&&res.status<300) {
            setList(res.data);
        }
    }

    const handleChange = (evnt) => {
        const { name, value } = evnt.target;
        setTask({ ...task, [name]: value });
    }

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        try {
            if (task.task == '' || task.desc == '') return alert('Fill all the fields');
            let res = await axios.post(`${baseServerURI}/add`, task, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status>=200 && res.status<300) {
                alert(res.data.msg);
                fetchRender();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar name={name} token={token} />
            <main>
                <div className="newTaskContainer">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="task" placeholder='Task' value={task.task} onChange={handleChange} />
                        <input type="text" name="desc" placeholder='Description' value={task.desc} onChange={handleChange} />
                        <input type="submit" value="Add" />
                    </form>
                </div>
                <div className="taskContainer">
                    {
                        list && list.map((el, id) => <Task el={el} key={id} setUpdate={fetchRender} token={token} />)
                    }
                </div>
            </main>
        </>
    )
}

export default Home
