import React, { useState } from 'react'
import  MovieCard  from '../MovieCard/MovieCard'
import { LoadingSpin } from '../LoadingSpin'
import { Row, Pagination } from 'antd'
import './RatedTab.css'
import useGetRatedMoviesApi from '../Api/useGetRatedMoviesApi'
import GuestSessionApi from '../Api/GuestSessionApi'

const PageSize = 20

export const RatedTab: React.FC = () =>{
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { guestSessionId } = GuestSessionApi()
  const { ratedMovies, loading, totalItems } = useGetRatedMoviesApi(guestSessionId, currentPage)


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <LoadingSpin />
  }

  return (
    <Row className='card-list rate-list'>
      {ratedMovies.map(movie => (
        <div className='card-box' key={movie.id}>
          <MovieCard {...movie} />
        </div>
      ))}
      {totalItems > 0 && (
        <Pagination
          className='pagination'
          align="center"
          current={currentPage}
          pageSize={PageSize}
          total={totalItems}
          onChange={handlePageChange}
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
          }}
        />
      )}
    </Row>
  )
}