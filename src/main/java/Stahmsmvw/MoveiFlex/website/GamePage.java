package Stahmsmvw.MoveiFlex.website;
import org.springframework.stereotype.Controller;
import Stahmsmvw.MoveiFlex.movieID.MovieIDService;

/*
 * @author Vincent Westlund
 */

@Controller
public class GamePage {
    
    private final MovieIDService movieIDService;

    public GamePage(MovieIDService movieIDService) {
        this.movieIDService = movieIDService;
    }
}
