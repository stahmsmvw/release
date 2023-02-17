package Stahmsmvw.MoveiFlex.spotifyAuth;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Anthon HavÃ¤ng
* This class defines the API for authenticating the server to
Spotify in order to search there, and
* the ways of using Spotify's API to search for tracks.
*/
@RestController
@RequestMapping(
     value = "/audio",
     headers = "Accept=application/json")
public class AuthController {

     private static final String clientId = Keys.ClientId.value();
     private static final String clientSecret = Keys.ClientSc.value();
     private static String accessToken = "";

     private String getAccessToken() {
          StringBuilder response = new StringBuilder();
          try {
               URL authorizationEndpoint = new URL("https://accounts.spotify.com/api/token");
               HttpURLConnection connection = (HttpURLConnection)
               authorizationEndpoint.openConnection();

               connection.setRequestMethod("POST");
               connection.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes("UTF-8")));
               connection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");

               connection.setDoOutput(true);
               DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());

               outputStream.writeBytes("grant_type=client_credentials");
               outputStream.flush();
               outputStream.close();

               BufferedReader in = new BufferedReader(new
               InputStreamReader(connection.getInputStream()));
               String inputLine;

               while ((inputLine = in.readLine()) != null) {
               response.append(inputLine);
               }
               in.close();

               JSONObject jsonResponse = new JSONObject(response.toString());
               return jsonResponse.getString("access_token");
          } catch (Exception e) {
               System.out.println("Error while getting accesstoken: " + e.getMessage());
          }
          return null;   
     }

     @GetMapping("/search/{title}")
     @ResponseBody
     public String spotifySearch(@PathVariable String title) {
          StringBuilder response = new StringBuilder();

          if (accessToken.equals("")) {
               accessToken = getAccessToken();
               System.out.println("ACCESS TOKEN: " + accessToken);
          }
          String query = title + " soundtrack main theme movie";
          query = query.replace(" ", "%20");
          System.out.println(query);
          try {
               URL searchEndpoint = new URL("https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=1");
               System.out.println(searchEndpoint);
               HttpURLConnection connection = (HttpURLConnection)
               searchEndpoint.openConnection();

               connection.setRequestProperty("Accept", "application/json");
               connection.setRequestProperty("Content-Type", "application/json");
               connection.setRequestProperty("Authorization", "Bearer " + accessToken);

               connection.setRequestMethod("GET");

               BufferedReader in = new BufferedReader(new
               InputStreamReader(connection.getInputStream()));
               String inputLine;

               while ((inputLine = in.readLine()) != null) {
               response.append(inputLine);
               }
               in.close();


               //System.out.println("RESPONSE: " + response.toString());
               JSONObject jsonResponse = new JSONObject(response.toString());
               JSONObject tracks = jsonResponse.getJSONObject("tracks");
               JSONArray items = tracks.getJSONArray("items");
               JSONObject firstItem = items.getJSONObject(0);
               String uri = firstItem.getString("uri");
               //System.out.println("PRINT URI: " + uri);
               return uri;
          } catch (Exception e) {
               System.out.println("Error while searching tracks:" + e.getMessage());
               //System.out.println("RESPONSE: " + response.toString());
               return "ERROR 404";
          }
     }

}