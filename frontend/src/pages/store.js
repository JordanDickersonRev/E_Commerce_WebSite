import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Store(){

    const [skateboards, setSkateboards] = useState([]);
    const [size, setSize] = useState('ALL');

    useEffect(()=>{
        Axios.get("http://localhost:3001/store",{
            params: {size}
        }).then((response)=>{setSkateboards(response.data);})
    });

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
                            <Link className='link' 
                            to='/skateboards' 
                            state={{ image: value.image_src,
                                    description: value.description,
                                    size: value.size,
                                    price: value.price,
                                    quantity: value.quantity
                                }}>
                                <img src={require('./images/'+ value.image_src)} alt={value.price}/>
                                <p>{value.description}</p>
                                <p>{value.size}</p> 
                                <p>{value.price}</p> 
                            </Link>
                        </div>     
                    })}
                </div>
            </div>
        </div>
    )
}
export default Store;