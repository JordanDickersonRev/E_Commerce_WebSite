import React,{useState, useEffect} from 'react';
import Axios from 'axios';
//import {useHistory} from 'react-router-dom';

function Store(){

    //let history = useHistory();
    const [skateboards, setSkateboards] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/store").then((response)=>{
            setSkateboards(response.data);
        })
    }, [])
    
    return(
        <div>
            <h2 className='PageHeading'>Complete Skateboards</h2>
            <div className='Store'>
                <div className='Sizes'>
                    <label>SIZE</label>
                    <hr/>
                    <div className='DeckSizes'>
                        <button>7.0</button>
                        <button>7.5</button>
                        <button>7.625</button>
                        <button>7.75</button>
                        <button>8.0</button>
                        <button>8.25</button>
                    </div>
                </div>
                <div className='SkateBoards'>
                    {skateboards.map((value)=>{
                        return <div key={value.id}>
                            <button>FAVORITE</button>
                            <img src={require('./images/'+ value.image_src)} alt={value.price}/>
                            <p>{value.description}</p> 
                            <p>{value.price}</p> 
                        </div>     
                    })}
                </div>
            </div>
        </div>
    )
}
export default Store;