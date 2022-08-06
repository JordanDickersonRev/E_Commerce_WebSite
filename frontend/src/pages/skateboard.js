import { useLocation } from "react-router-dom"
import {addtoBag, fullBag} from "./mybag"
import { setGlobalState , useGlobalState } from '../global/globalStates';
import React, {useState,useEffect} from 'react';

function SkateBoards(){
    const location = useLocation();
    const {image, description, size, price, quantity} = location.state;
    const [buyingNumber, setbuyingNumber] = useState(1);
    

    useEffect(()=>{
        setGlobalState('image',`${image}`);
        setGlobalState('description',`${description}`);
        setGlobalState('size',`${size}`);
        setGlobalState('price',`${price}`);
    });

    let skateboardLeft = ''//, bagButton = 'Add to bag';
    if (quantity === 0) skateboardLeft = `Out of stock`;
    else if(quantity < 5) skateboardLeft = `Only ${quantity} left!`;

    function submitTobag(image,description,size,price,quantity,buyingNumber){
        if(fullBag(description)){
            alert(`${description} already exist in my bag.`);
        }
        else{
            if(quantity < buyingNumber) alert(`Only ${quantity} left, could not add to bag.`);
            else if(quantity === 0) alert(`Out of stock, could not add to bag.`);
            else {
                alert(`Successfully added to your bag.`);
                addtoBag(image,description,size,price,quantity,buyingNumber);
            }
        }
    }

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
                    <button onClick={()=>submitTobag(image,description,size,price,quantity,buyingNumber)}>
                            ADD TO BAG
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SkateBoards;