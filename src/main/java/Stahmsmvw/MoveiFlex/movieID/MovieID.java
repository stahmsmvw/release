package Stahmsmvw.MoveiFlex.movieID;

import jakarta.persistence.*;

/**
 * @author Anthon Haväng
 * This class serves as an interface to the database and maps attributes from
 * the "movieids"-table in the database to Java interpretable data.
 */
@Entity
@Table(name = "movieids")
public class MovieID {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(name = "movieid")
     private String movieID;

     public MovieID() {
     }

     public MovieID(Long id, String movieID) {
          this.id = id;
          this.movieID = movieID;
     }

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getMovieID() {
          return movieID;
     }

     public void setMovieID(String movieID) {
          this.movieID = movieID;
     }

     @Override
     public String toString() {
          return "MovieID{" +
                    "id=" + id +
                    ", movieID='" + movieID + '\'' +
                    '}';
     }
}
