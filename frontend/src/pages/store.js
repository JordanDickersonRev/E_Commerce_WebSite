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
        <div className='Store'>
            <h2 className='PageHeading'>Complete Skateboards</h2>
            <div className='SkateBoards'>
                {skateboards.map((value)=>{
                    return <div key={value.id}>
                        <img src={require('./images/'+ value.image_src)} alt={value.price}/>
                        <p>{value.description}</p> 
                        <p>{value.price}</p> 
                    </div>     
            })}
            </div>
        </div>
    )
}
export default Store;