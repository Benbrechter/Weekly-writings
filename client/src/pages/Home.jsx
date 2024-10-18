import { Link } from 'react-router-dom';

function Home(){
    return(
        <div className='home-container'>
            <div className='home-writings'>
                <Link to = '/writings'className='home-h1'> <h1 >This Weeks Story</h1></Link>
                <Link to = '/prevWriting'className='home-h1'><h1 >Previous Weeks Story</h1></Link>
            </div>
            {/* this is the link to the logo */}
            <div className='home-img'>
                <Link to = '/about'><img src="" alt="This will be my hand done Logo" /> </Link>
            </div>

            <div className='home-trey'>
                <Link to = 'Trey'className='home-h1'><h1 >Picture Of Trey</h1></Link>
            </div>

            <div className='home-contact'>
                <Link to = '/contact'className='home-h1'><h1 >Contact</h1></Link>
            </div>
            
        </div>
    )
}

export default Home