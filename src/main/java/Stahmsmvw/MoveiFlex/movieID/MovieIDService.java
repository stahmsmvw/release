package Stahmsmvw.MoveiFlex.movieID;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.Serializable;
import java.util.*;

@Service
@Transactional
public class MovieIDService implements Serializable {
     private final MovieIDRepository movieIDRepository;

     @Autowired
     public MovieIDService(MovieIDRepository movieIDRepository){
          this.movieIDRepository = movieIDRepository;
     }

     /**
      * @author Anthon Haväng
      */
     public List<MovieID> getAll(){
          return movieIDRepository.findAll();
     }

     /**
      * @author Anthon Haväng
      * @return A list with 4 unique movies
      */
     public Set<MovieID> getRandomID(){
          Random random = new Random();
          Set<MovieID> set = new HashSet<>();

          for (int i = 0; set.size() < 4; i++) {
               set.add(movieIDRepository.getReferenceById(random.nextLong(99)));
               System.out.println("Added " + random);
          }
          return set;
     }
}
