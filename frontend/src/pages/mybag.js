import React,{useState, useEffect} from 'react';
import { useGlobalState } from '../global/globalStates';
import Axios from 'axios';
import { Link } from 'react-router-dom';

let bag = [], bagText ='', key = 0, key2 = 0; 
let boardTotal = 0, subTotal = 0, taxTotal = 0, shippingTotal = 0 ,totalAmount = 0;

export function fullBag(description){return bagText.includes(description);}

export function addtoBag(image,description,size,price,quantity,buyingNumber){
        bagText += description;
        boardTotal = price * buyingNumber;
        subTotal += boardTotal;
        bag.push(<div key={key += 1}>
            <Link className='link'
                to='/skateboards' 
                state={{ image: image,
                    description: description,
                    size: size,
                    price: price,
                    quantity: quantity
                }}>
                <img src={require('./images/'+ image)} alt={description}/>
                <p>{description}</p>
                <p>{size}</p> 
                <p>{price}</p>
                <p>{buyingNumber}</p>
            </Link>
        </div> );  
}

function MyBag(){

    const [favorites, setFavorites] = useState([]);
    const [username] = useGlobalState("username");

    useEffect(()=>{
        Axios.get("http://localhost:3001/favorites", {
            params: {username}
        }).then((response)=>{setFavorites(response.data);})
    });

    let myBag = `MY BAG (${bag.length}) ITEMS`;
    let h3Favorites = 'LOG IN TO VIEW YOUR FAVORITES';
    if(username !== '') h3Favorites = `FAVORTIES (${favorites.length} ITEMS)`;

    if(subTotal !== 0){
        subTotal > 99.99 ? shippingTotal = 0: shippingTotal = 10.00;
        taxTotal = subTotal * 0.05;
        totalAmount = subTotal + shippingTotal + taxTotal;
    }

    function emptyBag(){
        bag = []; 
        bagText =''; 
        key = 0;
        key2 = 0;
        boardTotal = 0;
        subTotal = 0; 
        taxTotal = 0; 
        shippingTotal = 0; 
        totalAmount = 0;
    }

    return (
        <div className="myBag">
            <div className='bagItems'>
                <h3>{myBag}</h3>
                <hr/>
                <div className='bagMenu'>
                    {bag}
                </div>
                <h3>{h3Favorites}</h3>
                <hr/>
                <div className='favoriteMenu'>
                    {favorites.map((value)=>{
                        return <div key={key2 += 1}>
                        <Link to='/skateboards' 
                            state={{ image: value.image_src,
                            description: value.description,
                            size: value.size,
                            price: value.price,
                            quantity: value.quantity
                        }}>
                            <img src={require('./images/'+ value.image_src)} alt={value.description}/>
                        </Link>
                    </div> 
                    })}
                </div>
            </div>
            <div className='orderSummary'>
                <h3>ORDER SUMMARY</h3>
                <hr/>
                <div className='orderTotal'>
                    <label>Subtotal</label>
                    <label>{`$${subTotal.toFixed(2)}`}</label>
                </div>
                <div className='orderTotal'>
                    <label>Shipping</label>
                    <label>{`$${shippingTotal.toFixed(2)}`}</label>
                </div>
                <div className='orderTotal'>
                    <label>Tax</label>
                    <label>{`$${taxTotal.toFixed(2)}`}</label>
                </div>
                <div className='orderTotal'>
                    <label>Total</label>
                    <label>{`$${totalAmount.toFixed(2)}`}</label>
                </div>
                <hr/>
                <br/>
                <button onClick={()=>emptyBag()}>EMPTY BAG</button>
                <button>PAY WITH CREDIT OR GIFT CARD</button>
                <button>PayPal</button>
                <button>PayPal CREDIT</button>
            </div>
        </div>
    )
}
export default MyBag;