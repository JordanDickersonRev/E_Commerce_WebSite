import Hamburger from "./hamburger";
import { Link } from 'react-router-dom'; 

function Header(){
    return (
        <div> 
            <Hamburger/>
            <label className="message">FREE SHIPPING ON SUBTOTALS OVER $99.99</label> 
            <nav className="navbar">
                <Link to='/' className="navbar_logo">Skate<br/>House</Link>
                <ul className="navbar_menu">
                    <li>
                        <Link to='/store' className="navbar_link">Skateboards</Link>
                    </li>
                    <li>
                        <Link to='/mybag' className="navbar_link">Bag</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header;