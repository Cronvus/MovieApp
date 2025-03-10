import React, { useState } from 'react'
import { SearchApi } from '../Api'
import { MovieList } from '../MovieList'
import { Search } from '../Search'
import { ErrorAlert } from '../ErrorAlert'
import { LoadingSpin } from '../LoadingSpin'

export const SearchTab: React.FC = () =>{
  const [searchText, setSearchText] = useState<string>('')

  const handelSearch = (text: string) =>{
    setSearchText(text)
  }

  const { movies, loading, error } = SearchApi({ searchText })

  return (
    <div className='box-content'>
      <Search onSearch={handelSearch}/>
      {loading && <LoadingSpin />}
      {error && <ErrorAlert />}
      <MovieList movies={movies} />
    </div>
  )
    
}