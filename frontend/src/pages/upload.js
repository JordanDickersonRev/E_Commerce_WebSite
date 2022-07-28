import React,{useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';

function Upload(){
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    function submitSkateboard(e){
        e.preventDefault();
        let tryAgain = [];

        if(image === '' || description === '' || size ===''|| price === '' || quantity === '')
            tryAgain.push(`Error blank field(s)<br />`);
        else if (isNaN(price) || isNaN(size) || isNaN(quantity))
            tryAgain.push(`Price, Size and Quantity must equal some kind of number <br />`);
        else {
            Axios.post('http://localhost:3001/upload',{
                image_src: image, 
                description: description.trim(),
                size: size,
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
            <Form>
            <h2 className='PageHeading'>UPLOAD SKATEBOARD</h2>
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
            <Form.Control className ='Input'
                    onChange={e => setSize(e.target.value)}
                    type="text"
                    placeholder = "Enter Size" required />
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