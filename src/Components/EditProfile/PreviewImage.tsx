import React from 'react'

const PreviewImage = ({src, name, cohort}:any) => {
    return (
        <article className="edit-page-picture">
            <h2 className="edit-page-picture-greeting">{name}</h2>
            <img className = "edit-page-picture-image" src={src} alt="The user" />
            <h3 className="edit-page-picture-cohort">Bootcamp {cohort}</h3>
        </article>
    )
}

export default PreviewImage
