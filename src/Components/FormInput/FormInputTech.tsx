import React, {useState} from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    builtUsing:any, 
    setBuiltUsing:(val:any)=> void}

const FormInputTech : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name, 
    builtUsing,
    setBuiltUsing}) => {  

    const handleIconClick = (key:any) => {
        // const newBuiltUsing = {
        //     ...builtUsing,
        //         builtUsing[key].used=!builtUsing[key].used
        //     }
        // setBuiltusing(builtUsing[key].used=!builtUsing[key].used)
        // console.log(newBuiltUsing)

        Object.assign({}, builtUsing, {
            key:Object.assign ({}, builtUsing[key],
                {used:true}
            )
        })
    console.log(builtUsing)}
    
    // console.log(builtUsing["HTML"].image)
    const builtUsingIconsArray = []
    for (const key of Object.keys(builtUsing)){
            builtUsingIconsArray.push(
            <img 
                src={builtUsing[key].image} 
                alt = {builtUsing[key].name}
                onClick = {() => handleIconClick(key) }
                />
            )
        }
            
    // console.log(builtUsingIconsArray)
    return (
        <div>
            <ul>
                <label htmlFor={labelFor}>{labelText}</label>
                {builtUsingIconsArray.map((icon, i) => {
                    return <li key={i} >{icon}</li>
                } )
                }
            </ul>
        </div>
    )
            }

// const ImageCheckbox = ({builtUsingImage}) =>{
//     return (
//     <img src={builtUsingImage} alt="built using"/>

//     )
// }

export default FormInputTech
