import { useLocation } from "react-router-dom"

function SkateBoards(){
    const location = useLocation();
    const {image, description, size, price, quantity} = location.state;

    return (
        <div>
            <h2 className='PageHeading'>{description}</h2>
            <div className="skateboardPage">
                <img src={require('./images/'+ image)} alt={price}/>
                <div className="skateboardInfo">
                    <label>{'$'+price}</label>
                    <hr/>
                    <label>{'SIZE: '+size}</label>
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
                    <p id="skateboardsLeft"></p> 
                </div>
            </div>
        </div>
    )
}
export default SkateBoards;