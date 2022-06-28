import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';

function Login(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let tryAgain = '';

    function loginUser(){
        if(username === '' || email === '' || password === ''){
            tryAgain = "Error";
            document.getElementById('error').innerHTML = tryAgain + "<br />";
        }
        else {
            Axios.post('http://localhost:3001/login', {
            username: username, 
            email: email,
            password: password
            }, (err,result) =>{
                if(err) console.log(err);
            })
        }
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder = "Create Username" required />
                </Form.Group>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder = "Enter Email" required />
                </Form.Group>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder = "Create Password" required />
                </Form.Group>
                <label id='error' />
                <Button onClick={e => loginUser(e)} type="submit">Submit</Button>
            </Form>
        </div>
    )
}
export default Login;