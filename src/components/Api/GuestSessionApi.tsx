import { useEffect, useState } from 'react'

const GuestSessionApi = () => {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() =>{
    const existingSessionId = sessionStorage.getItem('guest_session_id')
    if (existingSessionId) {
      setGuestSessionId(existingSessionId)
      setLoading(false)
      return
    }

    const createGuestSession = async () => {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTE5OWI2N2E3M2VmN2FmMWZlYjMzZjY3Y2Y4Y2QyZSIsIm5iZiI6MTczOTAzMTUzMS4wNDcwMDAyLCJzdWIiOiI2N2E3ODNlYjVmYTQyZDdlNzZmMTFhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i46lkodk_H43eGhs3aqo7l2QNE8taifa84imps5otiM',
        },
      }

      try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
        if (!response.ok) {
          throw new Error('The guest session was not created')
        }
        const data = await response.json()
        setGuestSessionId(data.guest_session_id)
        sessionStorage.setItem('guest_session_id', data.guest_session_id)
      } catch (e) {
        setError(e instanceof Error ? e.message : "It's trap")
      } finally {
        setLoading(false)
      }
    }
    
    createGuestSession()
  }, [])

  return { guestSessionId, loading, error }
}

export default GuestSessionApi