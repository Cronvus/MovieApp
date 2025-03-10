const PostRateMoviesApi = (movieId: number, rating: number, guestSessionId: string | null) => {
  const rateMovie = () => {
    if (!guestSessionId) {
      console.error('No guest session id')
      return
    }
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
      },
      body: JSON.stringify({ value: rating }),
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options)
      .then(res => res.json())
      .then(res => console.log(res, guestSessionId, movieId))
      .catch(err => console.error(err))
  }
  return { rateMovie }
}

export default PostRateMoviesApi