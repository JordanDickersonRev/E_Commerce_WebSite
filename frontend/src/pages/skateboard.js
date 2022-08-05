import { useLocation } from "react-router-dom"
import {addtoBag, removefromBag} from "./mybag"
import { setGlobalState , useGlobalState } from '../global/globalStates';
import React, {useState,useEffect} from 'react';

function SkateBoards(){
    const location = useLocation();
    const {image, description, size, price, quantity} = location.state;
    const [buyingNumber, setbuyingNumber] = useState(0);

    useEffect(()=>{
        setGlobalState('image',`${image}`);
        setGlobalState('description',`${description}`);
        setGlobalState('size',`${size}`);
        setGlobalState('price',`${price}`);
    });

    let skateboardLeft = ''//, bagButton = 'ADD TO MY BAG';

    if (quantity === 0) skateboardLeft = `Out of stock`;
    else if(quantity < 5) skateboardLeft = `Only ${quantity} left!`;

    return (
        <div>
            <h2 className='PageHeading'>{description}</h2>
            <div className="skateboardPage">
                <img src={require('./images/'+ image)} alt={price}/>
                <div className="skateboardInfo">
                    <p>{'$'+price}</p>
                    <hr/>
                    <p>{'SIZE: '+size}</p>
                    <hr/>
                    <label>QUANTITY:</label>
                    <br/>
                    <select className="quantity">
                        <option onChange={()=>setbuyingNumber(1)}>1</option>
                        <option onChange={()=>setbuyingNumber(2)}>2</option>
                        <option onChange={()=>setbuyingNumber(3)}>3</option>
                        <option onChange={()=>setbuyingNumber(4)}>4</option>
                        <option onChange={()=>setbuyingNumber(5)}>5</option>
                    </select>
                    <p>{skateboardLeft}</p>
                    <button onClick={()=>addtoBag(image,description,size,price,quantity,buyingNumber)}>
                            ADD TO MY BAG
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SkateBoards;