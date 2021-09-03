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

    const projectsArray:any[] = [
    <div className="admin-page-projects-list-item">
        <span className="admin-page-projects-list-1">
            Project Name
        </span>
        <span className="admin-page-projects-list-2">
            Preview
        </span>
        <span className="admin-page-projects-list-3">
            GitHub URL
        </span>
        <span className="admin-page-projects-list-4">
            Approved
        </span>
        <span className="admin-page-projects-list-5">
            Featured
        </span>
    </div>
    ]

    allProjects.forEach((project:any,i:number) =>{
        projectsArray.push(
            <div className="admin-page-projects-list-item">
                <span className="admin-page-projects-list-1">
                    {project.projectName}
                </span>
                <span className="admin-page-projects-list-3">
                    {project.githubUrl}
                </span>
                {/* {project.contributors.map((person:string, i:number)=>
                    <span key={i} className="admin-page-projects-list-3">
                        {person}
                    </span>
                )} */}
                <input type="checkbox" defaultChecked={project.approved} className="admin-page-projects-list-4"/>
                <input type="checkbox" defaultChecked={project.featured} className="admin-page-projects-list-5"/>
            </div>
        )
    })

    return (
        <section className="admin-page-projects">
            {projectsArray}
        </section>
    )
}

export default AdminProjectDisplay