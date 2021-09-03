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

    const [approved, setApproved] = useState(projects[i].approved)
    
    const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>)=>{
        setApproved(!approved)
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
                {approved? 
                    <CheckedIcon className="admin-checked-icon"/>: 
                    <UncheckedIcon className="admin-unchecked-icon"/>}
            </label>
        </div>
    )
}

export const Featured = ({projects, setProjects,i}:Props) => {
    return (
        <div className="admin-page-projects-list-5" >
            <input 
                type="checkbox" 
                defaultChecked={projects[i].featured} 
                id={`feature-${i}`}
            />
            <label htmlFor={`feature-${i}`}></label>
        </div>
    )
}

export const Remove = ({projects, setProjects,i}:Props) => {
    return (
        <div className="admin-page-projects-list-6">
            <input 
                type="checkbox" 
                defaultChecked={false} 
                id={`remove-${i}`}
                />
            <label htmlFor={`remove-${i}`}></label>
        </div>
    )
}


