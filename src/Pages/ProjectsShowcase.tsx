import React,{useState, useEffect} from 'react'

import '../Styling/ProjectsShowcase.css'
import Projects from '../Components/Projects'

import axios from 'axios'
import { API_URL } from '../config'

import sidebar from '../Components/BackgroundsPlus/ShowcaseUpLeft.png'
import line from '../Components/BackgroundsPlus/Line.png'

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
          <div>
            <section className="project-showcase-container">

              <header className="project-showcase-header">
                <h1 className="project-showcase-header-text">Showcase</h1>
                <img className="project-showcase-header-line" src={line} alt="Bar on the side" />
              </header>

              <section className="project-showcase-display">
                <img className="project-showcase-sidebar-line" src={sidebar} alt="seperating line" />
              </section>

              <section className="project-showcase-display-objects">
                {data.map((project, i) => <Projects key={i} data={project} />)}
              </section>

            </section>               
           </div>

        </>
      )
}

export default Showcase