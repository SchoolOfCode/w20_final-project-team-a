import React,{useState, useEffect} from 'react'

import '../Styling/ProjectsShowcase.css'
import Projects from '../Components/Projects'

import axios from 'axios'
import { API_URL } from '../config'


const Showcase =  () => {

  const [data, setData] = useState([{}])

  useEffect(()=>{
      const getData = async() =>{
          axios.get(API_URL+"projects/all") 
          .then(
              (response) => {
                //   response.data.forEach((project:any) => setData([...data,project]))
                //     console.log(response.data)
                setData(response.data)
                }
              )
      }
      getData()
  }, [])
  
      return (
        <>

            <div className="projects-showcase-div">

            {data.map((project, i) => <Projects key={i} data={project} />)}
               
           </div>

        </>
      )
}

export default Showcase