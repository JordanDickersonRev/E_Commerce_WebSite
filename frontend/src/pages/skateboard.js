import { useLocation } from "react-router-dom"

function SkateBoards(){
    const location = useLocation();
    const {image, description, size, price, quantity} = location.state;
    let skateboardLeft = '', bagButton = 'ADD TO MY BAG';

    if (quantity === 0) skateboardLeft = `Out of stock`;
    else if(quantity < 5) skateboardLeft = `Only ${quantity} left!`;
    
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
                    <select className="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <p>{skateboardLeft}</p>
                    <button>{bagButton}</button> 
                </div>
            </div>
        </div>
    )
    
}
export default SkateBoards;