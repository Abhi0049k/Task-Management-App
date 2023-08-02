import React from 'react';
import axios from 'axios';
import './Task.css';

const baseServerURI = 'https://zealous-wasp-hospital-gown.cyclic.cloud/todo';

const Task = ({ el, setUpdate, token, update }) => {
    const handleChange = async (evnt)=>{
        const {name, checked} = evnt.target;
        const id = evnt.target.getAttribute('data-id');
        let body;
        if(checked===false) body = {[name]: 'pending'};
        else body = {[name]: 'completed'};
        let res = await axios.patch(`${baseServerURI}/update/${id}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.status>=200 && res.status<=299){
            return;
        }else{
            alert('Something went wrong')
        }
    }

    const deleteTask = async (id)=>{
        const res = await axios.delete(`${baseServerURI}/delete/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.status>=200 && res.status<300){
            setUpdate(update+1);
        }else{
            alert('Something went wrong');
        }
    }

    return (
        <>
            <div className='taskCard'>
                {
                    el.status === 'pending' ? (
                        <input type="checkbox" name='status' onChange={handleChange} data-id={el._id} />
                    ) : (
                        <input type="checkbox" name='status' checked onChange={handleChange} data-id={el._id} />
                    )
                }
                <h1>
                    <span className="task">{el.task}</span>
                    <span className="desc">{el.desc}</span>
                </h1>
                <i className="fa-solid fa-xmark" onClick={()=> deleteTask(el._id)}></i>
            </div>
        </>
    )
}

export default Task
