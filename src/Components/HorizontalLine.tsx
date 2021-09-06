import React from 'react'
import '../Styling/HorizontalLine.css'

const HorizontalLine = ({className}:any) => {

    return (
        <div className={"horizontal-line-container "+ className}>
        <div className="horizontal-line"></div>
        <div className="circle"></div>
    </div>
    )
}

export default HorizontalLine
