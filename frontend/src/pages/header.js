import Hamburger from "./hamburger";
function Header(){

    return (
        <nav className="navbar" id="outer-container">
            <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
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
    )
}
export default Header;