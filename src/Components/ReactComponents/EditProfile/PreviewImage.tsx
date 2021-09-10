const PreviewImage = ({displayName,photo,cohort}:any) => {
    

    return (
        <article className="edit-page-picture">
            <h2 className="edit-page-picture-greeting">{displayName}</h2>
            <img className = "edit-page-picture-image" src={photo} alt="The user" />
            <h3 className="edit-page-picture-cohort">Bootcamp {cohort}</h3>
        </article>
    )
}

export default PreviewImage
