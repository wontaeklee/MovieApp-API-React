import { Button, Row } from 'antd';
import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'; 
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from '../MovieDetail/Sections/MovieInfo'
import GridCards from '../common/GridCard'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    
    const [Movie, setMovie]  = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}` 
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCasts(response.cast)
    })

    }, [])

    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)
    }
    
    return (
        <div>
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.original_title} text={Movie.overview}/>

            <div style={{width: '85%', margin: '1rem auto'}}>

                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    < Favorite movie={Movie} movieId = {Movie.movieId} userFrom={localStorage.getItem('userId')} />
                </div>
                <MovieInfo 
                    movie={Movie}
                />
                <div style={{display: 'flex', justifyContent: 'center' , margin: '2rem'}}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button> 
                </div>
                {ActorToggle &&
                                <Row gutter={[16,16]}>
                                {Casts && Casts.map((cast,index)=>(
                                    <React.Fragment key={index}>
                                        <GridCards style={{width: '100%', height: '320px'}} image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} characterName={cast.name}
                                         />
                                    </React.Fragment>
                                ))}
                            </Row>

                }


            </div>
        </div>
    )
}

export default withRouter(MovieDetail)
