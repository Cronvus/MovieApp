import React, { useEffect, useState } from 'react'
import { Row, Pagination } from 'antd'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'
import { Movie } from '../Interface/Interface'


interface MovieListProps {
  movies: Movie[]
  totalMovies: number
  onPageChange: (page: number) => void
  currentPage: number
}

const PageSize = 20

export const MovieList: React.FC<MovieListProps> = ({ movies, totalMovies, onPageChange, currentPage }) => {
  const [selectedPage, setSelectedPage] = useState<number>(currentPage)

  useEffect(() => {
    setSelectedPage(currentPage)
  }, [currentPage])
  
  const handelPageChange = (page: number) => {
    setSelectedPage(page)
    onPageChange(page)
  }


  return (
    <Row className='card-list'>
      {movies.map(movie => (
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
      { totalMovies > 0 &&
        (<Pagination 
          className='pagination'
          align="center"
          defaultCurrent={1}
          current={selectedPage}
          pageSize={PageSize}
          total={totalMovies}
          onChange={handelPageChange}
          hideOnSinglePage
          showSizeChanger={false}
          pageSizeOptions={[]}
          itemRender={(page, type, originalElement) => {
            if (type === 'prev') {
              return <a>&lt;</a>
            }
            if (type === 'next') {
              return <a>&gt;</a>
            }
            return originalElement
          }}/>
        )}
    </Row>
  )
}

