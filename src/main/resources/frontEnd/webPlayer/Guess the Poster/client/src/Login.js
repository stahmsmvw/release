import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a6efc533d8444fa49fbaf5e02f0541f2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div id="wrapper">
            <h1>MovieFlex✨</h1>
            <div class="container">
                <ul class="myUL">
                    <li>Listen to the song</li>
                    <li>Match the song with movie poster</li>
                    <li>Click on the poster you have chosen for the song</li>
                </ul>
            </div>
            <div class="button">
              <a className="btn btn-success btn-lg" href={AUTH_URL}>
              Login with Spotify
            </a>
        </div>
    </div>
    </Container>
  )
}
