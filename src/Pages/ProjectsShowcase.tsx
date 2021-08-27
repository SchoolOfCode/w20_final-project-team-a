import React from 'react'

import '../Styling/ProjectsShowcase.css'
import Projects from '../Components/FormInput/Projects'

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
          <div className="wrapper">
              <Projects/>
              <Projects/>

          </div>
      )
}

export default Showcase
