import { Link } from 'react-router-dom'; 

function Home() {
    return(
        <div className='homePage'>
            <Link to='/store'>
                <div className='homeSection1'>
                    <h2 className='hs1Heading'>BEST DEALS FOR COMPLETE SKATEBOARDS</h2>
                    <label className='hs1Label'>SHOP NOW!</label>
                </div>
            </Link>
            <div className='homeSection2'>
                
            </div>
            <div className='homeSection3'>
                <div className='homeCard1'>
                    
                </div>
                <div className='homeCard2'>
                    
                </div>
                <div className='homeCard3'>

                </div>
                <div className='homeCard4'>

                </div>
            </div>  
        </div>
    )
}
export default Home;
/*<img src={require('./branding/decksImage.png')} alt='SKATE DECKS'/>*/