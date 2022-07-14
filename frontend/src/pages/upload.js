import React,{useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';

function Upload(){
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    function submitSkateboard(e){
        e.preventDefault();
        let tryAgain = [];

        if(image === '' || description === '' || price === '' || quantity === '')
            tryAgain.push(`Error blank field(s)<br />`);
        else if (isNaN(price) || isNaN(quantity))
            tryAgain.push(`Price and Quantity must equal some kind of number <br />`);
        else {
            Axios.post('http://localhost:3001/upload',{
                image_src: image, 
                description: description.trim(),
                price: price,
                quantity: quantity
            }).then(function(response){
                console.log(response.data);

                if(response.data.message) 
                    document.getElementById('error').innerHTML = response.data.message + "<br />";
            });
        }
        document.getElementById('error').innerHTML = tryAgain.join('');
    }

    return(
        <div>
            <h2>Upload Skateboard</h2>
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
            <Form.Group>
                <Form.Control className ='Input'
                    onChange={e => setPrice(e.target.value)}
                    type="text"
                    placeholder = "Enter Price" required />
            </Form.Group>
            <Form.Group>
                <Form.Control className ='Input'
                    onChange={e => setQuantity(e.target.value)}
                    type="text"
                    placeholder = "Enter Quantity" required />
            </Form.Group>
            <label id='error' />
            <Button onClick={e => submitSkateboard(e)} type="submit">Upload Skateboard to Database</Button>
            </Form>
        </div>
    )
}

export default Upload;