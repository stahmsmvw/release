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

@RestController
@RequestMapping(
          value = "/audio",
          headers = "Accept=application/json")
public class AuthController {

     private static final URI redirect =
               SpotifyHttpManager.makeUri("http://localhost:10123/callback");

     private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
               .setClientId(Keys.ClientId.value())
               .setClientSecret(Keys.ClientSc.value())
               .setRedirectUri(redirect)
               .build();

     private static final ClientCredentialsRequest clientCredentialsRequest =
               spotifyApi.clientCredentials().build();

     @GetMapping("/login")
     @ResponseBody
     public void spotifyLogin() {
          clientCredentials_Sync();
     }

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

    @GetMapping("/search/{title}")
    @ResponseBody
    public String spotifySearch(@PathVariable String title) {
        SearchItemRequest sir = spotifyApi
                  .searchItem(title + " soundtrack main theme", "track")
                  .build();

        try {
          final se.michaelthelin.spotify.model_objects.special.SearchResult sr = sir.execute();
          System.out.println(sr.getTracks().getItems()[0].getUri());
          return sr.getTracks().getItems()[0].getUri();
        } catch(IOException | SpotifyWebApiException | ParseException e){
            e.printStackTrace();
            return null;
        }
    }
}
