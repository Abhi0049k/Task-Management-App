import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const baseServerURI = 'https://zealous-wasp-hospital-gown.cyclic.cloud/user/login'

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const handleChange = (evnt)=>{
        const {name, value} = evnt.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (evnt) =>{
        evnt.preventDefault();
        if(credentials.email===''|| credentials.password===''){
            alert('Fill all the fields before submitting the form.');
            return;
        }
        try{
            const res = await axios.post(baseServerURI, credentials);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('token', res.data.token);
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <div className="formContainer">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' name='email' value={credentials.email} onChange={handleChange}/>
                    <input type="password" placeholder='Password' name='password' value={credentials.password} onChange={handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
                <div className="link">
                <Link to='/register'>Not a user?, Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
