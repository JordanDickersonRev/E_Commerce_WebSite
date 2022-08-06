import React,{useState, useEffect} from 'react';
import { useGlobalState } from '../global/globalStates';
import Axios from 'axios';

let bag = [];
let bagText = '';
//let index = 0;
let key = 0;

export function fullBag(description){return bagText.includes(description);}

export function addtoBag(image,description,size,price,quantity,buyingNumber){
        bagText += description;
        bag.push(<div key={key += 1}>
            <img src={require('./images/'+ image)} alt={description}/>
                <p>{description}</p>
                <p>{size}</p> 
                <p>{price}</p>
                <p>{buyingNumber}</p>
            </div>);
    
}

/*export function removefromBag(value){
    index = bag.indexOf(value);
    bag.splice(index, 1);
}*/

function MyBag(){

    const [favorites, setFavorites] = useState([]);
    const [shippingTotal, setshippingTotal] = useState('TBD');
    const [taxTotal, settaxTotal] = useState('TBD');
    const [totalAmount, settotalAmount] = useState(0.00);

    const [subTotal] = useGlobalState("subTotal");
    const [username] = useGlobalState("username");

    useEffect(()=>{
        Axios.get("http://localhost:3001/favorites", {
            params: {username}
        }).then((response)=>{setFavorites(response.data);})
    });

    let myBag = `MY BAG (${bag.length}) ITEMS`;
    let h3Favorites = 'LOG IN TO VIEW YOUR FAVORITES';
    if(username !== '') h3Favorites = `FAVORTIES (${favorites.length} ITEMS)`;

    function emptyBag(){
        bagText = '';
        bag = [];
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
                        return <div key={value.description}>
                        <img src={require('./images/'+ value.image_src)} alt={value.description}/>
                    </div> 
                    })}
                </div>
            </div>
            <div className='orderSummary'>
                <h3>ORDER SUMMARY</h3>
                <hr/>
                <div className='orderTotal'>
                    <label>Subtotal</label>
                    <label>{subTotal}</label>
                </div>
                <div className='orderTotal'>
                    <label>Shipping</label>
                    <label>{shippingTotal}</label>
                </div>
                <div className='orderTotal'>
                    <label>Tax</label>
                    <label>{taxTotal}</label>
                </div>
                <div className='orderTotal'>
                    <label>Total</label>
                    <label>{totalAmount}</label>
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