import React, { useState, useEffect } from 'react'
import { SearchApi } from '../Api'
import { MovieList } from '../MovieList'
import { Search } from '../Search'
import { ErrorAlert } from '../ErrorAlert'
import { LoadingSpin } from '../LoadingSpin'

export const SearchTab: React.FC = () =>{
  const [searchText, setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const previewQuery = localStorage.getItem('preview')
    if (previewQuery) {
      setSearchText(previewQuery)
      setCurrentPage(1)
    }
  }, [])

  const handelSearch = (text: string) =>{
    setSearchText(text)
    setCurrentPage(1)
    localStorage.setItem('preview', text)
  }



  const { movies, loading, error, totalMovies } = SearchApi({ searchText, currentPage })

  return (
    <div className='box-content'>
      <Search onSearch={handelSearch}/>
      {loading && <LoadingSpin />}
      {error && <ErrorAlert />}
      <MovieList 
        movies={movies}
        totalMovies={totalMovies}
        onPageChange={setCurrentPage}
        currentPage={currentPage}/>
    </div>
  )
    
}