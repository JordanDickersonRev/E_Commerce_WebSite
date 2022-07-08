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
            {skateboards.map((value)=>{
                return <div key={value.id}>
                    {value.brand}
                    {value.price}
                </div>
                //return <img src={value.image}></img>     
            })}
        </div>
    )
}
export default Store;