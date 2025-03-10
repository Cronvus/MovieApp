import React from 'react'
import { Tabs } from './components/Tabs'
import './App.css'
import { GenreProvider } from './context/GenreContext'


export const App: React.FC = () => {

  return (
    <GenreProvider>
      <div className='box-content'>
        <Tabs />
      </div>
    </GenreProvider>
  )
}

