import { createContext, useContext, useState, useEffect } from 'react'

interface Genre {
  id: number
  name: string
}

interface GenreContextType {
  genres: Genre[]
}

const GenreContext = createContext<GenreContextType | undefined>(undefined)

export const GenreProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ genres, setGenres ] = useState<Genre[]>([])

  const genreMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
      },
    }
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      const data = await response.json()
      setGenres(data.genres)
    } catch (error) {
      console.error('Error fetching genre', error)
    }
  }
  useEffect(() => {
    genreMovies()
  }, [])
  return (
    <GenreContext.Provider value={{ genres }}>
      {children}
    </GenreContext.Provider>
  )
}

export const useGenre = () => {
  const context = useContext(GenreContext)
  if (!context) {
    throw new Error('useGenre must be defined')
  }

  return context.genres
} 