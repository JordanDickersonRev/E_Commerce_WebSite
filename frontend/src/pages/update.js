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
            Axios.put('http://localhost:3001/store',{
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
            <Form>
            <h2 className='PageHeading'>UPDATE IMAGE</h2>
            <Form.Group>
                <Form.Control className ='Input'
                    onChange={e => setImage(e.target.value)}
                    type="text"
                    placeholder ="Image File Name" required />
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