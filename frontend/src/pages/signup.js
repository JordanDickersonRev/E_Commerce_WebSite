import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';

function Signup(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setconfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    
    /*useEffect(()=>{
        Axios.get('http://localhost:3001/users').then((response) =>{
            console.log(response.data);
        });
    }, []);*/

    

    function signupUser(e){

        e.preventDefault();
        let tryAgain = [];

        const unnecessaryPattern = /([^!?\w]|\s)/g;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const speccharPattern = /[!?_]/g;
        const lowercasePattern = /[a-z]/g;
        const uppercasePattern = /[A-Z]/g;
        const digitPattern = /\d/g;

        if(username === '' || email === '' || confirmEmail === '' || password === '')
            tryAgain.push(`Error blank field(s)<br />`);
        else if(unnecessaryPattern.test(username)){
            tryAgain.push(`Username can only contain<br />`);
            tryAgain.push(`- digits<br />`);
            tryAgain.push(`- ! , ? or _<br />`);
            tryAgain.push(`- uppercase or lowercase letters<br />`);
            tryAgain.push(`- NO SPACES<br />`);
        }
        else if(username.length < 6)
            tryAgain.push(`Username must have at least 6 characters<br />`);
        else if(!emailPattern.test(email)){
            tryAgain.push(`Please enter a valid email address<br />`);
            tryAgain.push(`- NO SPACES<br />`);
        }
        else if(confirmEmail !== email)
            tryAgain.push(`Email and Confirm Email must match<br />`);
        else if(password.length < 8)
            tryAgain.push(`Password must have at least 8 characters<br />`);
        else if(!lowercasePattern.test(password) || !uppercasePattern.test(password)
            || !digitPattern.test(password) || !speccharPattern.test(password)
            || unnecessaryPattern.test(password)){
            tryAgain.push(`Password must contain at least one of each<br />`); 
            tryAgain.push(`- uppercase letter<br />`);
            tryAgain.push(`- lowercase letter<br />`);
            tryAgain.push(`- number<br />`);
            tryAgain.push(`- ! or ? or _<br />`);
            tryAgain.push(`- NO SPACES<br />`);
        }
        else {
            Axios.post('http://localhost:3001/signup', {
            username: username, 
            email: email,
            password: password
            }).then(function(response){
                console.log(response.data);

                if(response.data.message) 
                    document.getElementById('error').innerHTML = response.data.message + "<br />";
            });
        }
        document.getElementById('error').innerHTML = tryAgain.join('');
    }

    /*let page = useNavigate();

    const createPost = (e) =>{
        e.preventDefault();
        page('/');
    }*/

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
                    onChange={e => setconfirmEmail(e.target.value)}
                    type="email"
                    placeholder = "Confirm Email" required />
                </Form.Group>
                <Form.Group>
                    <Form.Control className ='Input'
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder = "Create Password" required />
                </Form.Group>
                <label id='error' />
                <Button onClick={e => signupUser(e)} type="submit">Submit</Button>
            </Form>
        </div>
    )
}
export default Signup;

/* 
            <label>username</label>
            <input type="text"
                name='username'
                onChange={(e) => setUsername(e.target.value)} />
            <label>email</label>
            <input type="text"
                name='email'
                onChange={(e) => setEmail(e.target.value)} />
            <label>password</label>
            <input type="text"
                name='password'
                onChange={(e) => setPassword(e.target.value)} />
            <button onClick={createUser}>Submit</button>*/