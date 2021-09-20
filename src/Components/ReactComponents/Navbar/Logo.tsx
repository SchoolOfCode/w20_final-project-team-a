import React from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {

    // const [hovered, setHovered] = useState(false)
    
    return (
    <>
        <Link to="/" 
        // onMouseEnter={()=> setHovered(true)}
        // onMouseLeave={()=> setHovered(false)}
        >[ SoC_Expo ]</Link>
    </>
    )
}

export default Logo
