package Stahmsmvw.MoveiFlex.movieID;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Anthon Haväng
 * Enables the option to define interface methods, and the usage of JpaRepository. Can be implemented further
 * should one want to.
 */
public interface MovieIDRepository extends JpaRepository<MovieID, Long> {
     MovieID getDistinctBy();
}
