package Stahmsmvw.MoveiFlex.website;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * @author Vincent Westlund
 */

@Controller
public class Index {

    public Index() {
    }

    @GetMapping()
    public String index() {
        return "index";
    }
}


