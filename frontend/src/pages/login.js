import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { setGlobalState } from '../global/globalStates';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let page = useNavigate();
    const unnecessaryPattern = /([^!?\w]|\s)/g;
    
    function loginUser(e){

        e.preventDefault();
        let tryAgain = [];

        if(email === '' || password === '')
            tryAgain.push(`Error blank field(s)<br />`);   
        else {
            Axios.get('http://localhost:3001/users', {
                params: {email,password}
            }).then(function(response){
                if(!unnecessaryPattern.test(response.data)){
                    setGlobalState("username", response.data);
                    page('/');
                }
                
                if(response.data.message) 
                    document.getElementById('error').innerHTML = response.data.message + "<br />";
            });
        }
        document.getElementById('error').innerHTML = tryAgain.join('');
    }

    return (
        <div>
            <Form>
            <h2 className='PageHeading'>LOG IN</h2>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder = "Email" required />
                </Form.Group>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder = "Password" required />
                </Form.Group>
                <label id='error' />
                <Button onClick={e => loginUser(e)} type="submit">LOG IN</Button>
            </Form>
        </div>
    )
}
export default Login;