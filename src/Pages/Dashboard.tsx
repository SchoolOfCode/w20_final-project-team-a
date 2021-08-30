import React from 'react'
import { Link, useHistory } from 'react-router-dom'

type DashboardProps = {
    loginStatus: boolean
}
const Dashboard : React.FC<DashboardProps> = ({loginStatus}) =>{

    const history = useHistory()
    //check if user is logged in
    if (loginStatus === false){
        history.push("/login")
    }

    return (
        <div>
            <h1>Welcome</h1>
            <Link to="/submit">
                <button>Submit</button>
            </Link>
        </div>
    )
}


export default Dashboard

