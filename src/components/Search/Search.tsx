import React, { useState, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'
import './Search.css'
import { SearchProps } from '../Interface/Interface'

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')

  const debounceSearch = useRef(debounce((value: string) =>{
    onSearch(value)
  }, 500)).current
    
  const searchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    const value = e.target.value
    setSearchText(value)
    debounceSearch(value)
  }

  useEffect(() => {
    return () => {
      debounceSearch.cancel()
    }
  }, [debounceSearch])
    
  return (
    <form className='form-search' onSubmit={e => e.preventDefault()}>
      <input className='input-search' type="text" placeholder="Type to search..." value={searchText} onChange={searchChange} />
    </form>
  )
}