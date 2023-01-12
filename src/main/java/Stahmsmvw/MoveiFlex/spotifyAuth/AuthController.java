package Stahmsmvw.MoveiFlex.spotifyAuth;

import java.io.IOException;
import java.net.URI;

import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.*;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.search.SearchItemRequest;
import se.michaelthelin.spotify.model_objects.special.SearchResult;

/**
 * @author Anthon Haväng
 * This class defines the API for authenticating the server to Spotify in order to search there, and
 * the ways of using Spotify's API to search for tracks.
 */
@RestController
@RequestMapping(
          value = "/audio",
          headers = "Accept=application/json")
public class AuthController {

     private static final URI redirect =
               SpotifyHttpManager.makeUri("http://localhost:10123/callback");

     /**
      * Constructs the ADT for handling using the builder pattern. Credentials from the class Keys are
      * used.
      */
     private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
               .setClientId(Keys.ClientId.value())
               .setClientSecret(Keys.ClientSc.value())
               .setRedirectUri(redirect)
               .build();

     private static final ClientCredentialsRequest clientCredentialsRequest =
               spotifyApi.clientCredentials().build();

     /**
      * Authenticates the server to Spotifys API using provided credentials. Access token is received that
      * lasts for an hour.
      */
     public static void clientCredentials_Sync() {
          try {
               final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
               // Set access token for further "spotifyApi" object usage
               spotifyApi.setAccessToken(clientCredentials.getAccessToken());
               System.out.println("Expires in: " + clientCredentials.getExpiresIn());

          } catch (IOException | SpotifyWebApiException | ParseException e) {
               System.out.println("Error: " + e.getMessage());
          }
     }

     /**
      * Uses Michael Thelins implementation as a means of searching in Spotify API.
      *
      * @param title used as search value
      * @return a URI to/from a specific track, usable by for example an embedded Spotify player, as JSON
      * @author Hadi Saghir
      */
     @GetMapping("/search/{title}")
     @ResponseBody
     public String spotifySearch(@PathVariable String title) {
          if (spotifyApi.getAccessToken() == null) {
               clientCredentials_Sync();
          }
        SearchItemRequest sir = spotifyApi
                  .searchItem(title + " soundtrack main theme", "track")
                  .build();

          try {
               final SearchResult sr = sir.execute();
               return sr.getTracks().getItems()[0].getUri();
          } catch (IOException | SpotifyWebApiException | ParseException e) {
               e.printStackTrace();
               return null;
          }
     }
}
