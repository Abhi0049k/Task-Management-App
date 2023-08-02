import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const baseServerURI = 'https://zealous-wasp-hospital-gown.cyclic.cloud/user/register'

const Register = () => {
    const [credentials, setCredentials] = useState({name: '', email: '', password: ''});
    const navigate = useNavigate();
    const handleChange = (evnt)=>{
        const {name, value} = evnt.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (evnt)=>{
        evnt.preventDefault();
        if(credentials.email===''|| credentials.password==='' || credentials.name===''){
            alert('Fill all the fields before submitting the form.');
            return;
        }
        try{
            const res = await axios.post(baseServerURI, credentials);
            if(res.status>=200 && res.status<300){
                alert(res.data.msg);
                navigate('/login');
            }else{
                alert(res.data.msg);
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <div className="formContainer">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="Name" placeholder='Name' name='name' value={credentials.name} onChange={handleChange} />
                    <input type="email" placeholder='Email' name='email' value={credentials.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' name='password' value={credentials.password} onChange={handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <div className="link">
                <Link to='/login'>Already a user?, Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
