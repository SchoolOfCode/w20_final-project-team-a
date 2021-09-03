import React, {useState} from 'react'
import {ReactComponent as RemoveIcon} from './remove.svg'
import {ReactComponent as CheckedIcon} from './checked.svg'
import {ReactComponent as UncheckedIcon} from './unchecked.svg'


type Props={
    projects:any,
    setProjects:any,
    i:number
}

export const Approved = ({projects, setProjects,i}:Props) => {

    const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>)=>{
        const updatedProjects = [...projects]
        updatedProjects[i] = {
            ...updatedProjects[i], approved: !updatedProjects[i].approved
        }
        setProjects(updatedProjects)
    }

    return (
        <div className="admin-page-projects-list-4">
            <input 
                type="checkbox" 
                defaultChecked={projects[i].approved} 
                id={`approve-${i}`}
            />
            <label 
                htmlFor={`approve-${i}`}
                onClick={(e)=> handleClick(e)}
                >
                {projects[i].approved? 
                    <CheckedIcon className="admin-checked-icon"/>: 
                    <UncheckedIcon className="admin-unchecked-icon"/>
                }
            </label>
        </div>
    )
}

export const Featured = ({projects, setProjects,i}:Props) => {

    const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>)=>{
        const updatedProjects = [...projects]
        updatedProjects[i] = {
            ...updatedProjects[i], featured: !updatedProjects[i].featured
        }
        setProjects(updatedProjects)
    }

    return (
        <div className="admin-page-projects-list-5" >
            <input 
                type="checkbox" 
                defaultChecked={projects[i].featured} 
                id={`feature-${i}`}
            />
            <label 
                htmlFor={`feature-${i}`}
                onClick={(e)=> handleClick(e)}
                >
                {projects[i].featured? 
                    <CheckedIcon className="admin-checked-icon"/>: 
                    <UncheckedIcon className="admin-unchecked-icon"/>
                }
            </label>
        </div>
    )
}

export const Remove = ({projects, setProjects,i}:Props) => {

    const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>)=>{
        const updatedProjects = [...projects]
        updatedProjects[i] = {
            ...updatedProjects[i], remove: !updatedProjects[i].remove
        }
        setProjects(updatedProjects)
    }

    return (
        <div className="admin-page-projects-list-6">
            <input 
                type="checkbox" 
                defaultChecked={false} 
                id={`remove-${i}`}
                />
            <label 
                htmlFor={`remove-${i}`}
                onClick={(e)=> handleClick(e)}
                >
                {projects[i].remove? 
                    <RemoveIcon className="admin-remove-checked-icon"/>: 
                    <RemoveIcon className="admin-remove-unchecked-icon"/>
                }
            </label>
        </div>
    )
}


