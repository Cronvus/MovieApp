import React, { useState } from 'react'
import { SearchTab } from '../SearchTab'
import { RatedTab } from '../RatedTab'
import './Tabs.css'

export const Tabs: React.FC = () =>{
  const [ activeTab, setActiveTab ] = useState<'search' | 'rated'>('search')
    
  return (
    <div>
      <div className="tabs">
        <button className={activeTab === 'search' ? 'active' : ''} 
          onClick={()=>setActiveTab('search')}>
                    Search
        </button>
        <button className={activeTab === 'rated' ? 'active' : ''}
          onClick={()=>setActiveTab('rated')}>
                    Rated
        </button>
      </div>
      <div className="tabs-content">
        {activeTab === 'search' ? (
          <SearchTab />
        ) : (
          <RatedTab />
        )}
      </div>
    </div>
  )
}
