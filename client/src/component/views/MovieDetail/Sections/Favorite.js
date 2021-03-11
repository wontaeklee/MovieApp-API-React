import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Favorite(props) {
    
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movie.original_title
    const moviePost = props.movie.backdrop_path
    const movieRunTime = props.movie.runtime


    const [favoriteNumber, setfavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variable = {
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variable)
        .then(response=> {
            if(response.data.success){
                console.log(response.data)
                setfavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패하였습니다.')
            }
        })

        Axios.post('/api/favorite/favorited', variable)
        .then(response=> {
            if(response.data.success){
                setFavorited(response.data.favorited)
                console.log(response.data)
            } else {
                alert('정보를 가져오는데 실패하였습니다.')
            }
        })

    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response=>{
                    if(response.data.success){
                        setfavoriteNumber(favoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Favorite 리스트 삭제 실패')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response=>{
                if(response.data.success){
                    setfavoriteNumber(favoriteNumber + 1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite 리스트 추가 실패')
                }
            })
        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"} {favoriteNumber}</button>
        </div>
    )
}

export default Favorite
 
