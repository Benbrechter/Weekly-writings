import { Link } from 'react-router-dom';

function HomeBtn(){
    return(
        <div className='home-btn'>
            <Link to = '/Home'><img src="" alt="This is going to route you home" /></Link>
            
        </div>
    )
}

export default HomeBtn