import Hamburger from "./hamburger";

function Header(){
    return (
        <div>
            <Hamburger/>
            <nav className="navbar">
                <label className="navbar_logo">Skate<br/>House</label>
                <ul className="navbar_menu">
                    <li>
                        <label>Complete Skateboards</label>
                    </li>
                    <li>
                        <label>My Bag</label>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header;