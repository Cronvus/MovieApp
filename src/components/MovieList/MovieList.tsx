import React, { useState } from 'react'
import { Row, Pagination } from 'antd'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'
import { Movie } from '../Interface/Interface'


interface MovieListProps {
  movies: Movie[]
}

const PageSize = 8

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [selectedPage, setSelectedPage] = useState<number>(1)
    
  const startIndex = (selectedPage - 1) * PageSize
  const lastIndex = startIndex + PageSize
  const pageMovies = movies.slice(startIndex, lastIndex)
  const onPage = (page: number) =>{
    setSelectedPage(page)
  }


  return (
    <Row className='card-list'>
      {pageMovies.map(movie => (
        <div className='card-box' key={movie.id}>
          <MovieCard
            id={movie.id}
            genre_ids={movie.genre_ids}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            overview={movie.overview}
          />
        </div>
      ))}
      { movies.length > 0 &&
        (<Pagination className='pagination' align="center" defaultCurrent={1} current={selectedPage} pageSize={PageSize} total={movies.length} onChange={onPage} />
        )}
    </Row>
  )
}

