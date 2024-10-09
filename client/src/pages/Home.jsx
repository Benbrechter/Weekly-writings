import { Link } from 'react-router-dom';

function Home(){
    return(
        <div>
            <div>
                <Link to = '/writings'> <h1>This Weeks Story</h1></Link>
                <Link to = '/preWritings'><h1>Next Weeks Story</h1></Link>
            </div>
            {/* this is the link to the logo */}
            <div>
                <Link to = '/about'><img src="" alt="This will be my hand done Logo" /> </Link>
            </div>

            <div>
                <Link to = 'Trey'><h1>Picture Of Trey</h1></Link>
            </div>

            <div>
                <Link to = '/contact'><h1>Contact</h1></Link>
            </div>
            
        </div>
    )
}

export default Home