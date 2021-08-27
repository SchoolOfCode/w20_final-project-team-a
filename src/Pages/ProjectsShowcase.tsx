import React from 'react'
import axios from 'axios'
import { API_URL } from '../config'


const Showcase = () => {

const data:any = []

axios.get(API_URL+"projects/all") 
.then(
    (response) => {
        response.data.forEach((project: any) => data.push(project))
    }

)
console.log(data)
    return (
        <div>
            
        </div>
    )
}

export default Showcase
