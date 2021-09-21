import React, {useState} from 'react'
import isEmail from 'validator/lib/isEmail'

type Props = {
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string, 
    className:string
    name:string, 
    contributors:string[],
    setContributors:(val:string[])=> void,
    index:number,
    formError: boolean[],
    setformError:(value:any)=>void

}

const FormInputContributors : React.FC<Props> = ({
    labelFor, 
    labelText, 
    type, 
    placeholder,
    className, 
    name, 
    contributors,
    setContributors,
    index,
    formError,
    setformError
    }) => {

    
    const [contributor, setContributor] = useState("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const addContributorEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (isEmail(contributor)) {
        setContributors([...contributors, contributor.toLowerCase()])
        setErrorMessage("");
        setformError(formError.map((item,i) => (i === index) ? item = false : item))
        }
        else {
            setErrorMessage("A valid contributor email address is required");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
        }
    }

    const removeContributorEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i:any) => {
        e.preventDefault();
        const newList = contributors.filter((item) => contributors[i] !== item)
        setContributors(newList)
    }

    return (
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={false}
                    onBlur={(e) => setContributor(e.target.value)}
                    onFocus={(e)=>e.target.value=""}
                ></input>
                <button 
                    onClick={(e)=>addContributorEmail(e)}
                    className="contributor-button add"
                >+</button>
                <ul>
                    {contributors[0] && 
                    contributors.map ((item,i) => {
                        return (
                        <li key={i}>
                            <button 
                                onClick={(e)=>removeContributorEmail(e,i)}
                                className="contributor-button remove"
                            >-</button>{item}
                        </li>
                        )
                    })}
                </ul>    
                <div className="invalid-input-message">
                {errorMessage}
                </div>            
        </div>
    )
}

export default FormInputContributors
