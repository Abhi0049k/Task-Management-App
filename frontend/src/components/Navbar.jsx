import React from 'react';
import axios from 'axios';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const baseServerURI = 'http://localhost:8998/user/logout';

const Navbar = ({name, token}) => {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        const res = await axios.get(baseServerURI, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.status>=200 && res.status<=299){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
        }else{
            alert('Something went wrong');
        }
    }
    return (
        <nav>
            <h1>Task Management App</h1>
            <div>
            <h2>{name}</h2>
            <button onClick={handleClick}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar;
