import { useState, useEffect } from "react"

export default function Poster({ postURI }) {
  const [image, setImage] = useState()

  useEffect(() => setImage(
    fetch("http://www.omdbapi.com/?i=tt6105098&apikey=10f5a22c")
    .then(res = res.json())
    .then((image) => setImage(image))
    ), [postURI])

  if (!accessToken) return null
  return (
    <div>
        <img hre>
        </img>    
    </div>
  )
}