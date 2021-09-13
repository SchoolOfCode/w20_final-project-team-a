import React from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    placeholder:string, 
    className:string,
    maxLength?:number, 
    name:string,
    setValue:(val:any)=> void,
}

const FormInputMultiText : React.FC<Props> = ({
    labelFor, 
    labelText, 
    placeholder, 
    className,
    maxLength=140,
    name,
    setValue,  
    }) => {  

    return (
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <textarea
                    placeholder={placeholder}
                    name={name}
                    required={true}
                    maxLength={maxLength}
                    onBlur={(e)=>setValue(e.target.value)}
                ></textarea>
        </div>
    )
}

export default FormInputMultiText