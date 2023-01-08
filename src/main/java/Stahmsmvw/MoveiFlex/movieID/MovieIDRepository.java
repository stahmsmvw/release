package Stahmsmvw.MoveiFlex.movieID;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Anthon Haväng
 */
public interface MovieIDRepository extends JpaRepository<MovieID, Long> {
     MovieID getDistinctBy();
}
