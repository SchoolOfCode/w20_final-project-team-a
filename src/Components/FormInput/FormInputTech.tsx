import React, {useState} from 'react'
import {techStack} from "../techStack/techStack"

type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    techUsed:any[], 
    setTechUsed:(val:any[])=> void}

const FormInputTech : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name, 
    setTechUsed}) => {  

    return (
        <div>
            <ul>
                <label htmlFor={labelFor}>{labelText}</label>
            </ul>
        </div>
    )
}

const ImageCheckbox = () =>{

}

export default FormInputTech
