import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_URL } from '../../config'

const AdminProjectDisplay = () => {

    const [allProjects, setAllProjects] = useState([]);

    useEffect(()=>{
        axios.get(API_URL+"auth/admin/list", {
            withCredentials: true
        })
        .then(res => {
            setAllProjects(res.data.projects)
        })
        .catch(err => console.log(err))
    },[])

    const projectsArray:any[] = []

    allProjects.forEach((project:any,i:number) =>{
        projectsArray.push(
            <li key={i}>
                <span className="admin-projectName-item">
                    {project.projectName}
                </span>
                {project.contributors.map((person:string, i:number)=>
                    <span key={i} className="admin-contributors-item">
                        {person}
                    </span>
                )}
                <input type="checkbox" defaultChecked={project.approved}/>
                <input type="checkbox" defaultChecked={project.featured}/>
            </li>
        )
    })

    return (
        <section className="admin-page-projects">
            <ul className="admin-page-projects-list">
                <li className="admin-page-projects-titles">
                    <span className="admin-projectName-title">
                        Project Name
                    </span>
                    <span className="admin-contributors-title">
                        Contributors
                    </span>
                    <span className="admin-contributors-approved">
                        Approved
                    </span>
                    <span className="admin-contributors-featured">
                        Featured
                    </span>
                </li>
                {projectsArray}
            </ul>
        </section>
    )
}

export default AdminProjectDisplay