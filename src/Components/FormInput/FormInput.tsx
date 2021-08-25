import React, {useState} from 'react'

const FormInput = ({labelFor="", labelText="", type="", placeholder="", name="", setValue=function name(params:any) {
    
}}) => {
    return (
        <div>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onBlur={(e)=>setValue(e.target.value)}
                ></input>
        </div>
    )
}

export default FormInput
