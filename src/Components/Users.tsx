import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../Styling/ProfilesShowcase.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {

const [visibleImage, setVisibleImage] = useState(true);

    return (
        <div 
        // className="profiles-showcase-overlay-container"
        >
        {visibleImage && 
        <div
        onMouseOver={()=>setVisibleImage(false)}
        >
        <p className="profiles-showcase-name-text"> {data.displayName}</p>
        <span className="profiles-showcase-cohort-text"> cohort {data.cohort}</span>
        <span className="profiles-showcase-overlay-container">            
        {/* <span className="profiles-showcase-overlay-text"> {data.email}</span> */}
            <img src={data.photo} 
                    alt="bootcamper pic" 
                    className="profiles-showcase-image"

                    />
            </span>
            </div>}
        {!visibleImage &&
        <div
            onMouseLeave={()=>setVisibleImage(true)}
        >

        {/* <span className="profiles-showcase-cohort-text"> cohort {data.cohort}</span>
            <Link to={{ pathname: '/bootcamper_profile', state: data}}>
                <img src={data.photo} alt="bootcamper pic" className="profiles-showcase-image"/>
            </Link>
            <span> {data.displayName}</span>
            <p> {data.statement}</p>
            <p> {data.email}</p>
           */}
            

        <p className="profiles-showcase-name-text"> {data.displayName}</p>
        <span className="profiles-showcase-cohort-text"> cohort {data.cohort}</span>
        <span className="profiles-showcase-overlay-container">

               <span className="profiles-showcase-overlay-text"> {data.email}</span>
              <Link to={{ pathname: '/bootcamper_profile', state: data}}>
                <img src={data.photo} alt="bootcamper pic" className="profiles-showcase-image"/>
            </Link>
               {/* <img src={data.photo} 
                       alt="bootcamper pic" 
                       className="profiles-showcase-image"
                       onMouseOver={()=>setVisibleImage(false)}
                       onMouseLeave={()=>setVisibleImage(true)}
                       /> */}
               </span>
        </div>
        
        }

        </div>
    )
}

export default Users
