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
 */
@RestController
@RequestMapping("/api/movieid")
public class MovieIDController implements Serializable {
     private final MovieIDService movieIDService;

     @Autowired
     public MovieIDController(MovieIDService movieIDService){
          this.movieIDService = movieIDService;
     }

     @GetMapping(produces = "application/json")
     public List<MovieID> getMovieID(){
          return movieIDService.getAll();
     }

     @GetMapping(value = "/game-instance", produces = "application/json")
     public Set<MovieID> gameInstance(){
          return movieIDService.getRandomID();
     }
}
