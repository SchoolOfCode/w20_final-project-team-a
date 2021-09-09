import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {

    // const [hovered, setHovered] = useState(false)
    
    return (
    <>
        {/* <span className="logo-brackets-visible">{`[`}</span> */}
        <Link to="/" 
        // onMouseEnter={()=> setHovered(true)}
        // onMouseLeave={()=> setHovered(false)}
        >[ SCHOOL_OF_CODE ]</Link>
        {/* <span className="logo-brackets-visible">{`]`}</span> */}

    </>
    )
}

export default Logo
