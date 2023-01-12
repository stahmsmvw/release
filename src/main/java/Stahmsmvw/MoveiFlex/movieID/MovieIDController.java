package Stahmsmvw.MoveiFlex.movieID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * @author Anthon Haväng
 * This class hosts all the endpoints under /api/movieid. These can be called externally when the server is running.
 */
@RestController
@RequestMapping("/api/movieid")
public class MovieIDController implements Serializable {
     private final MovieIDService movieIDService;

     /**
      * Constructor. Allows usage of the methods defined in MovieIDService.
      *
      * @param movieIDService
      */
     @Autowired
     public MovieIDController(MovieIDService movieIDService) {
          this.movieIDService = movieIDService;
     }

     /**
      * End point called with GET on /api/movieid.
      *
      * @return all the IMDB titles in the database from the corresponding method defined in the service class.
      */
     @GetMapping(produces = "application/json")
     public List<MovieID> getMovieID() {
          return movieIDService.getAll();
     }

     /**
      * End point called with GET on /api/movieid/game-instance.
      *
      * @return four random IMDB titles from the corresponding method defined in the service class.
      */
     @GetMapping(value = "/game-instance", produces = "application/json")
     public Set<MovieID> gameInstance() {
          return movieIDService.getRandomID();
     }
}
