package Stahmsmvw.MoveiFlex.spotifyAuth;

import java.net.URI;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

@RestController
@RequestMapping("/audio")
public class AuthController {
    
    private static final URI redirect =
    SpotifyHttpManager.makeUri("http://localhost:10123/callback");
    
    private String code = "";

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
        return uri.toString();
    }
}
