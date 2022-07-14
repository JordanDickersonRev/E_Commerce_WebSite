import React,{useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';

function Update(){
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    function updateImage(e){
        e.preventDefault();
        let tryAgain = [];

        if(image === '' || description === '')
            tryAgain.push(`Error blank field(s)<br />`);
        else {
            Axios.post('http://localhost:3001/update',{
                image_src: image, 
                description: description.trim(),
            }).then(function(response){
                console.log(response.data);

                if(response.data.message) 
                    document.getElementById('error').innerHTML = response.data.message + "<br />";
            });
        }
        document.getElementById('error').innerHTML = tryAgain.join('');
    }

    return (
        <div>
             <h2>Update Image</h2>
            <Form>
            <Form.Group>
                <Form.Control className ='Input'
                    onChange={e => setImage(e.target.value)}
                    type="text"
                    placeholder ="Ex ./images/image.jpg" required />
            </Form.Group>
            <Form.Group>
                <Form.Control className ='Input'
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder = "Enter Description" required />
            </Form.Group>
            <label id='error' />
            <Button onClick={e => updateImage(e)} type="submit">Update Skateboard Image</Button>
            </Form>
        </div>
    )
}
export default Update;