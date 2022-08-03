import React,{useState, useEffect} from 'react';
import { useGlobalState } from '../global/globalStates';
import Axios from 'axios';

function MyBag(){

    const [favorites, setFavorites] = useState([]);
    const [subTotal] = useGlobalState("subTotal");
    const [shippingTotal, setshippingTotal] = useState('TBD');
    const [taxTotal, settaxTotal] = useState('TBD');
    const [totalAmount, settotalAmount] = useState(0.00);

    const [username] = useGlobalState("username");

    useEffect(()=>{
        Axios.get("http://localhost:3001/favorites", {
            params: {username}
        }).then((response)=>{setFavorites(response.data);})
    });

    //if(username === '') document.getElementById("favoriteMenu").innerHTML = 'LOG IN TO VIEW FAVORITES';
    
    /*function displayFavorties(){
        if(username !== ''){
            {favorites.map((value)=>{
                return <div key={value.description}>
                    <img src={require('./images/'+ value.image_src)} alt={value.description}/> 
                </div>     
            })}
        }
        else return <p>LOG IN TO VIEW YOUR FAVORITES</p>
    }*/

    return (
        <div className="myBag">
            <div className='bagItems'>
                <h3>MY BAG</h3>
                <hr/>
                <div className='bagMenu'>
                    
                </div>
                <h3>FAVORITES</h3>
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
                <button>PAY WITH CREDIT OR GIFT CARD</button>
                <button>PayPal</button>
                <button>PayPal CREDIT</button>
            </div>
        </div>
    )
}
export default MyBag;
//<img src={require('./images/'+ value.image_src)} alt={value.description}/>
/*<p>{value.description}</p>
                        <p>{value.size}</p> 
                        <p>{value.price}</p> */