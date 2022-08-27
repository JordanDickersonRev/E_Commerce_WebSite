import { useLocation, useNavigate } from "react-router-dom"
import {addtoBag, fullBag} from "./mybag"
import { setGlobalState } from '../global/globalStates';
import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import { useGlobalState } from '../global/globalStates';

function SkateBoards(){
    let page = useNavigate();
    const location = useLocation();
    const {image, description, size, price, quantity} = location.state;
    const [buyingNumber, setbuyingNumber] = useState(1);
    const [username] = useGlobalState("username");
    
    useEffect(()=>{
        setGlobalState('image',`${image}`);
        setGlobalState('description',`${description}`);
        setGlobalState('size',`${size}`);
        setGlobalState('price',`${price}`);
    });

    function addtoFavorites(image, description, size, price, quantity){
        if(username === '') page('/login');
        else {
            Axios.post('http://localhost:3001/favorites', {
                image_src: image, 
                description: description,
                size: size,
                price: price,
                quantity: quantity,
                username: username
                }).then(function(response){
                    console.log(response.data);
                    if(response.data.message) 
                        document.getElementById("favoriteMessage").innerHTML = response.data.message;
                });
            }
    }

    let skateboardLeft = '';
    if (quantity === 0) skateboardLeft = `Out of stock`;
    else if(quantity <= 5) skateboardLeft = `Only ${quantity} left!`;

    function submitTobag(image,description,size,price,quantity,buyingNumber){
        if(fullBag(description))
            document.getElementById("bagMessage").innerHTML = `${description} already exist in your bag.`;
        else if(quantity < buyingNumber || quantity === 0) 
            document.getElementById("bagMessage").innerHTML = `Could not add to your bag.`;
        else {
            document.getElementById("bagMessage").innerHTML = `${description} was added to your bag.`;
            addtoBag(image,description,size,price,quantity,buyingNumber);
        }
    }

    return (
        <div>
            <h2 className='PageHeading'>{description}</h2>
            <div className="skateboardPage">
                <button className="favoriteButton"
                    onClick={()=>addtoFavorites(image, 
                    description, 
                    size, price, 
                    quantity)}>
                        FAVORITE
                    </button>
                <img src={require('./images/'+ image)} alt={price}/>
                <div className="skateboardInfo">
                    <p>{'$'+price}</p>
                    <hr/>
                    <p>{'SIZE: '+size}</p>
                    <hr/>
                    <label>QUANTITY:</label>
                    <br/>
                    <select className="quantity" 
                    onChange={(e) => setbuyingNumber(e.target.value)}
                    value={buyingNumber}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <p>{skateboardLeft}</p>
                    <p id="bagMessage"></p>
                    <button onClick={()=>submitTobag(image,description,size,price,quantity,buyingNumber)}>
                            ADD TO BAG
                    </button>
                    <p id="favoriteMessage"></p>
                </div>
            </div>
        </div>
    )
}
export default SkateBoards;