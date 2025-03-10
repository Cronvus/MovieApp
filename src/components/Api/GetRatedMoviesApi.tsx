import { useState, useEffect } from 'react'
import { Movie } from '../Interface/Interface'

const GetRatedMoviesApi = (guestSessionId: string | null, setRatedMovies: (movies: Movie[]) => void) => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRatedMovies = async () => {
      if (!guestSessionId) {
        return
      }
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
        },
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-EN&sort_by=created_at.asc`, options)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setRatedMovies(data.results)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRatedMovies()
  }, [guestSessionId, setRatedMovies])

  return { loading }
}

export default GetRatedMoviesApi