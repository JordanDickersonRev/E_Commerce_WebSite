import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../global/globalStates';

function Store(){

    const [skateboards, setSkateboards] = useState([]);
    const [size, setSize] = useState('ALL');
    let page = useNavigate();
    const [username] = useGlobalState("username");

    useEffect(()=>{
        Axios.get("http://localhost:3001/store",{
            params: {size}
        }).then((response)=>{
            setSkateboards(response.data);
        })
    });

    function addtoFavorites(image_src, description, size, price, quantity){
        if(username === ''){
            page('/login');
        }
        else {
            Axios.post('http://localhost:3001/favorites', {
                image_src: image_src, 
                description: description,
                size: size,
                price: price,
                quantity: quantity,
                username: username
                }).then(function(response){
                    console.log(response.data);
                    if(response.data.message) alert(response.data.message);
                });
            }
    }

    return(
        <div>
            <h2 className='PageHeading'>Complete Skateboards</h2>
            <div className='Store'>
                <div className='Sizes'>
                    <label>SIZES</label>
                    <hr/>
                    <div className='DeckSizes'>
                        <button onClick={()=> setSize('7.0')}>7.0</button>
                        <button onClick={()=> setSize('7.5')}>7.5</button>
                        <button onClick={()=> setSize('7.625')}>7.625</button>
                        <button onClick={()=> setSize('7.75')}>7.75</button>
                        <button onClick={()=> setSize('8.0')}>8.0</button>
                        <button onClick={()=> setSize('8.25')}>8.25</button>
                    </div>
                    <button onClick={()=> setSize('ALL')}>SHOW ALL</button>
                </div>
                <div className='SkateBoards'>
                    {skateboards.map((value)=>{
                        return <div key={value.id}>
                            <button onClick={()=>addtoFavorites(value.image_src, 
                            value.description, 
                            value.size, value.price, 
                            value.quantity)}>
                                FAVORITE
                            </button>
                            <img src={require('./images/'+ value.image_src)} alt={value.price}/>
                            <p>{value.description}</p>
                            <p>{value.size}</p> 
                            <p>{value.price}</p> 
                        </div>     
                    })}
                </div>
            </div>
        </div>
    )
}
export default Store;