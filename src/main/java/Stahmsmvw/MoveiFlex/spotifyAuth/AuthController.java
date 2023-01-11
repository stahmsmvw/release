package Stahmsmvw.MoveiFlex.spotifyAuth;

import java.io.IOException;
import java.net.URI;

import javax.naming.directory.SearchResult;

import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.search.SearchItemRequest;

@RestController
@RequestMapping("/audio")
public class AuthController {
    
    private static final URI redirect =
    SpotifyHttpManager.makeUri("http://localhost:10123/callback");
    
    private String code = "";

    private static String accessToken = "";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
        .setClientId(Keys.ClientId.value())
        .setClientSecret(Keys.ClientSc.value())
        .setRedirectUri(redirect)
        .build();
    
    @GetMapping("/login")
    @ResponseBody
    public String spofiyLogin() {
        AuthorizationCodeUriRequest acuReq = spotifyApi.authorizationCodeUri()
            .scope("user-read-private, user-top-read")
            .show_dialog(true)
            .build();
        final URI uri = acuReq.execute();
        accessToken = uri.toString();
        return uri.toString();
    }

    @GetMapping("/search")
    @ResponseBody
    public String spofiySearch() {
        SearchItemRequest sir = spotifyApi.searchItem("Lion king " + "Main Theme / Soundtrack", "track").build();
        
        try {
            final se.michaelthelin.spotify.model_objects.special.SearchResult sr = sir.execute();
            return sr.toString();
        } catch(IOException | SpotifyWebApiException | ParseException e){
            e.printStackTrace();
            return null;
        }
    }
}
