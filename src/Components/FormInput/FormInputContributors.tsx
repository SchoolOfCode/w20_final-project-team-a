import React, {SetStateAction, useState} from 'react'
import isEmail from 'validator/lib/isEmail'

// const FormInputContributors: React.FC = () => {}

type Props = {
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string, 
    name:string, 
    contributors:string[],
    setContributors:(val:string[])=> void}

const FormInputContributors : React.FC<Props> = ({
    labelFor, 
    labelText, 
    type, 
    placeholder, 
    name, 
    contributors,
    setContributors}) => {

    
    const [contributor, setContributor] = useState("")

    const addContributorEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (isEmail(contributor)) {
        setContributors([...contributors, contributor.toLowerCase()])
        }
        else setContributor("invalid email address")
    }

    const removeContributorEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i:any) => {
        e.preventDefault();
        const newList = contributors.filter((item) => contributors[i] !== item)
        setContributors(newList)
    }

    return (
        <div>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={true}
                    onBlur={(e) => setContributor(e.target.value)}
                ></input>
                <button onClick={(e)=>addContributorEmail(e)}>+</button>
                <ul>
                    {contributors[0] && 
                    contributors.map ((item,i) => {
                        return (
                        <li key={i}>Contributor {i+1}: {item}
                            <button onClick={(e)=>removeContributorEmail(e,i)}>-{i}</button>
                        </li>
                        )
                    })}
                </ul>                
        </div>
    )
}

export default FormInputContributors