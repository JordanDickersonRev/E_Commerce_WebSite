import { Link } from 'react-router-dom'; 

function Home() {
    return(
        <div className='homePage'>
            <Link to='/store' className='homeLink'>
                <div className='homeSection1'>
                    <img src={require('./branding/decksImage.png')} alt='SKATE DECKS'/>
                    <button>SHOP NOW!</button>
                    <span/>
                </div>
            </Link>
            <div className='homeSection2'>
                <img src={require('./branding/skateLedge.png')} alt='SKATE LEDGE'/>
                <button>ENTER TO WIN OUR SKATEHOUSE LEDGE W/ FULL SEND WAX</button>
            </div>
            <div className='homeSection3'>
                <div className='homeCard1'>
                    <img src={require('./branding/twitter.png')} alt='TWITTER'/>
                    <button>FOLLOW US ON TWITTER</button>
                </div>
                <div className='homeCard2'>
                    <img src={require('./branding/instagram.png')} alt='INSTAGRAM'/>
                    <button>FOLLOW US ON INSTAGRAM</button>
                </div>
                <div className='homeCard3'>
                    <img src={require('./branding/snapchat.png')} alt='SNAPCHAT'/>
                    <button>FOLLOW US ON SNAPCHAT</button>
                </div>
                <div className='homeCard4'>
                    <img src={require('./branding/facebook.png')} alt='FACEBOOK'/>
                    <button>FOLLOW US ON FACEBOOK</button>
                </div>
            </div>  
        </div>
    )
}
export default Home;
/*<img src={require('./branding/decksImage.png')} alt='SKATE DECKS'/>*/
/*<h2>BEST DEALS FOR COMPLETE SKATEBOARDS</h2>
                    */