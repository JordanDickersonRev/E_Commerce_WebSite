import Hamburger from "./hamburger";
import { Link, useNavigate } from 'react-router-dom'; 
import { setGlobalState ,useGlobalState } from '../global/globalStates';

function Header(){

    const page = useNavigate('/');

    const [username] = useGlobalState("username");
    if(username !== ''){
        document.getElementById("navbar_link").innerHTML = "Sign Out";
    }

    function signOut(){
        setGlobalState("username",'');
        page('/');
    }

    return (
        <div> 
            <Hamburger/>     
            <nav className="navbar">
                <Link to='/' className="navbar_logo">Skate<br/>House</Link>
                <ul className="navbar_menu">
                    <li>
                        <Link to='/store' className="navbar_link">Complete Skateboards</Link>
                    </li>
                    <li>
                        <Link to='/mybag' className="navbar_link">My Bag</Link>
                    </li>
                    <li>
                        <Link to='/'  id="navbar_link"></Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header;

//onClick={signOut()}