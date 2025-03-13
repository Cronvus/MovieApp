import React, { useState, useEffect } from 'react'
import { Card, Rate, Tag } from 'antd'
import { Movie } from '../Interface/Interface'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import './MovieCard.css'
import { LoadingSpin } from '../LoadingSpin'
import GuestSessionApi from '../Api/GuestSessionApi'
import PostRateMoviesApi from '../Api/PostRateMoviesApi'
import { useGenre } from '../../context/GenreContext'


const MovieCard: React.FC<Movie> = ({ id, genre_ids, poster_path, title, release_date, vote_average, overview }) => {
  const [rating, setRating] = useState<number>(0)
  const { guestSessionId } = GuestSessionApi()
  const { rateMovie } = PostRateMoviesApi(id, rating, guestSessionId)
  const genres = useGenre()


  const shortText = (text: string, maxLength: number): string =>{
    if (text.length <= maxLength) {
      return text
    }
    const sliceText = text.slice(0, maxLength)
    const lastIndex = sliceText.lastIndexOf(' ')
    return lastIndex !== -1 ? sliceText.slice(0, lastIndex) + '...' : sliceText + '...'
  }

  const getRatingCard = (): string => {
    let ratingClass = 'rating'

    if (vote_average < 3) {
      ratingClass += ' rating-lowed'
    } else if (vote_average < 5) {
      ratingClass += ' rating-low'
    } else if (vote_average < 7) {
      ratingClass += ' rating-medium'
    } else {
      ratingClass += ' rating-high'
    }

    return ratingClass
  }

  useEffect(() =>{
    const saveRating = JSON.parse(localStorage.getItem(`guest_${guestSessionId}_movie_${id}_rating`) || '{}')
    if (saveRating) {
      setRating(Number(saveRating.rating))
    }
  }, [id, guestSessionId])


  useEffect(() => {
    if (rating > 0) {
      const ratingObject = { rating : rating }
      localStorage.setItem(`guest_${guestSessionId}_movie_${id}_rating`, JSON.stringify(ratingObject))
      if (guestSessionId) {
        rateMovie()
      }
    }
  }, [rating, id, guestSessionId, rateMovie])



  const handelRate = (value: number) => {
    setRating(value)
  }

  const getGenreNames = () => {
    return (
      <>
        {genres
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => {
            return (
              <Tag className="genre-name" key={genre.id}>
                {genre.name}
              </Tag>
            )
          })}
      </>
    )
  }

  return (
    <Card key={id}>
      {poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
      ) : <LoadingSpin />}
      <div className='info-card'>
        <div className={getRatingCard()}>{vote_average.toFixed(1)}</div>
        <h2>{title}</h2>
        <p className='date-card'>{release_date ? format(release_date, 'LLLL dd, yyyy', { locale: ru }) : ''}</p>
        <div className='genre-card'>{getGenreNames()}</div>
        <p className='overview'>{shortText(overview, 150)}</p>
        <Rate allowHalf value={rating} onChange={handelRate} defaultValue={0} count={10}/>
      </div>
    </Card>
  )
}

export default MovieCard