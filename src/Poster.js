import './Poster.css'

function Poster({curr}) {
    return (
        <>  
            <h1 className="poster-title">
                {curr.original_title}
            </h1>
            <img src={'https://image.tmdb.org/t/p/w500'.concat(curr.poster_path)} height="400" width="266"/>
            <div className="poster-movie">
                { curr.overview}
            </div>
        </>
    )
}

export default Poster;