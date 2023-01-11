import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import "./style.css"

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [playingTrack, setPlayingTrack] = useState()
  const [round, setRound] = useState()

  const counter = 0
  const [gameIds, setGameIds] = useState([])

  /*
  useEffect(()=>{
    fetch("http://localhost:10123/api/movieid/game-instance")
    .then(res => 
      console.log(res))

      let front = document.getElementsByClassName("flip-card-front")
      let back = document.getElementsByClassName("flip-card-back-image")
      for(let i = 0; i < front.length; i++) {
          front[i].style.backgroundImage = "url(http://img.omdbapi.com/?i=" + gameIds[i] + "&apikey=10f5a22c)"
          back[i].style.backgroundImage  = "url(http://img.omdbapi.com/?i=" + gameIds[i] + "&apikey=10f5a22c)"
      }

  },[counter])
*/

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) {
      setPlayingTrack("")
      return
    }
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      console.log(res)
      setPlayingTrack(res.body.tracks.items[0])
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>

      </div>
      <div id="wrapper">
        <div class="card-holder">
            <div class="flip-card">
                <div class="flip-card-inner"> 
                    <div class="flip-card-front">
                        
                    </div>
                    <div class="flip-card-back" id="back1">
                        <div class="flip-card-back-image"></div>
                        <div class="flip-card-back-button">
                            <button class="card-button" onclick="checkAnswer()">Choose!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front border rounded">
                        
                    </div>
                    <div class="flip-card-back" id="back2">
                        <div class="flip-card-back-image">
                        </div>
                        <div class="flip-card-back-button">
                            <button class="card-button" onclick="checkAnswer()">Choose!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front border rounded">
                        
                    </div>
                    <div class="flip-card-back" id="back3">
                        <div class="flip-card-back-image">
                        </div>
                        <div class="flip-card-back-button">
                            <button class="card-button" onclick="checkAnswer()">Choose!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front border rounded">
                        
                    </div>
                    <div class="flip-card-back" id="back4">

                        <div class="flip-card-back-image">

                        </div>
                        <div class="flip-card-back-button">
                            <button class="card-button" onclick="checkAnswer()">Choose!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web-player">
          //<Player accessToken={accessToken} trackUri={playingTrack?.uri} />

        </div>
        <div class="quit-button">
            <button onclick="quitGame()" href="index1.html">
                <a href="index.html"></a>
            </button>
        </div>
      </div>
    </Container>
  )
}
