import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import './favorite.css'
import {Popover} from 'antd'
import { IMAGE_BASE_URL} from '../../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie();
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
            .then(response =>{
                if(response.data.success){
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화정보를 가져오는데 실패하였습니다')
                }
                
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        
        const variable = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success){
                    fetchFavoredMovie();
                } else {
                    alert('리스트 삭제 실패')
                }
            })
    }


    const renderCards = Favorites.map((favorites, index)=> {
        
        const content = (
            <div>
                {favorites.moviePost ? 

                <img src={`${IMAGE_BASE_URL}w500${favorites.moviePost}`}/> : "No Image"}
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorites.movieTitle}`}>
                <td>{favorites.movieTitle}</td>
            </Popover>
            <td>{favorites.movieRunTime} mins</td>
            <td><button onClick={()=> onClickDelete(favorites.movieId, favorites.userFrom)}>Remove</button></td>
        </tr>      
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>

                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
} 

export default FavoritePage
