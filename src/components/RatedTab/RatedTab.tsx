import React, { useState } from 'react'
import { Movie } from '../Interface/Interface'
import  MovieCard  from '../MovieCard/MovieCard'
import { LoadingSpin } from '../LoadingSpin'
import { Row } from 'antd'
import './RatedTab.css'
import GetRatedMoviesApi from '../Api/GetRatedMoviesApi'
import GuestSessionApi from '../Api/GuestSessionApi'



export const RatedTab: React.FC = () =>{
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([])
  const { guestSessionId } = GuestSessionApi()
  const { loading } = GetRatedMoviesApi(guestSessionId, setRatedMovies)


  if (loading) {
    return <LoadingSpin />
  }

  return (
    <Row className='card-list rate-list'>
      {ratedMovies.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </Row>
  )
}