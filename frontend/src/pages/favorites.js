import React,{useState, useEffect} from 'react';
import {useGlobalState } from '../global/globalStates';
import Axios from 'axios';

function Favorites(){

const [favorites, setFavorites] = useState([]);
const [username] = useGlobalState("username");

useEffect(()=>{
    Axios.get("http://localhost:3001/favorites", {
        params: {username}
    }).then((response)=>{setFavorites(response.data);})
});

function dropfromFavorites(description){
    
    Axios.delete(`http://localhost:3001/favorites`, {
            data: {description: description, username: username}
        }).then(function(response){
            console.log(response.data);
            if(response.data.message) {
                alert(response.data.message);
            };
        });
}

return (
    <div>
        <h2 className='PageHeading'>Favorites</h2>
        <div className='Store'>
                <div className='SkateBoards'>
                    {favorites.map((value)=>{
                        return <div key={value.description}>
                            <button onClick={()=>dropfromFavorites(value.description)}>
                                Remove
                            </button>
                            <img src={require('./images/'+ value.image_src)} alt={value.description}/>
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
export default Favorites;