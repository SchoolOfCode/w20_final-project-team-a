import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {

    // const [hovered, setHovered] = useState(false)
    
    return (
    <>
        <Link to="/" 
        // onMouseEnter={()=> setHovered(true)}
        // onMouseLeave={()=> setHovered(false)}
        >[ SCHOOL_OF_CODE ]</Link>
    </>
    )
}

export default Logo
