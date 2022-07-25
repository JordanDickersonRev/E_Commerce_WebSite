import { Link } from 'react-router-dom'; 

function Home() {
    return(
        <div className='homePage'>
            <Link to='/store' className='homeLink'>
                <div className='homeSection1'>
                    <img src={require('./branding/decksImage.png')} alt='SKATE DECKS'/>
                    <button>SHOP NOW!</button>
                </div>
            </Link>
            <div className='homeSection2'>
                <img src={require('./branding/skateLedge.png')} alt='SKATE LEDGE'/>
                <button>ENTER TO WIN OUR SKATEHOUSE LEDGE W/ FULL SEND WAX</button>
            </div>
            <div className='homeSection3'>
                <div className='homeCard1'>
                    <img src={require('./branding/twitter.png')} alt='TWITTER'/>
                    <label>FOLLOW US ON TWITTER</label>
                </div>
                <div className='homeCard2'>
                    <img src={require('./branding/instagram.png')} alt='INSTAGRAM'/>
                    <label>FOLLOW US ON INSTAGRAM</label>
                </div>
                <div className='homeCard3'>
                    <img src={require('./branding/snapchat.png')} alt='SNAPCHAT'/>
                    <label>FOLLOW US ON SNAPCHAT</label>
                </div>
                <div className='homeCard4'>
                    <img src={require('./branding/facebook.png')} alt='FACEBOOK'/>
                    <label>FOLLOW US ON FACEBOOK</label>
                </div>
            </div>  
        </div>
    )
}
export default Home;