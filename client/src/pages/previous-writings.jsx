import HomeBtn from "./componets/home-btn"
import { Link } from "react-router-dom"

function PrevWriting(){
    return(
        <div>
            <div><HomeBtn/></div>
            <div>
                <Link><h1>Fiore and Llamar</h1></Link>
                <Link><h1>Xan and Atreties</h1></Link>
                
            </div>
        </div>
    )
}

export default PrevWriting 