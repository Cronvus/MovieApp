import { useEffect } from 'react'
import useGetRatedMoviesApi from './useGetRatedMoviesApi'

const useClearRatedMovies = (guestSessionId: string | null) => {
  const { ratedMovies, loading } = useGetRatedMoviesApi(guestSessionId, 1)

  useEffect(() => {
    const clearRatedMovies = async () => {
      if (!guestSessionId || loading) return



      const movieIdsToClear: number[] = ratedMovies.map(movie => movie.id)

      for (const movieId of movieIdsToClear) {
        const options = {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
          },
        }

        try {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options)
          if (!res.ok) {
            throw new Error(`Failed to clear rating ${movieId}`)
          } else {
            console.log('res')
          }

          localStorage.removeItem(`movie_${movieId}_rating`)
        } catch (err) {
          console.error(`Error while clearing rating ${movieId}`, err)
        }
      }
    }

    clearRatedMovies()
  }, [guestSessionId, loading, ratedMovies])
}

export default useClearRatedMovies
