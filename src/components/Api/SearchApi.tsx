import { useEffect, useState } from 'react'
import GuestSessionApi from './GuestSessionApi'
import { Movie } from '../Interface/Interface'


export const SearchApi = ({ searchText, currentPage }: { searchText: string, currentPage: number }) => {
  const { guestSessionId } = GuestSessionApi()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalMovies, setTotalMovies] = useState<number>(0)

  useEffect(() => {
    const fetchMovies = async () =>{

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
        },
      }

      if (searchText.trim() === '') {
        setMovies([])
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchText)}&include_adult=false&language=en-US&page=${currentPage}`, options)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setMovies(data.results)
        setTotalMovies(data.total_results)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (guestSessionId) {
      fetchMovies()
    }
  }, [searchText, currentPage, guestSessionId])

  return { movies, loading, error, totalMovies }
}
