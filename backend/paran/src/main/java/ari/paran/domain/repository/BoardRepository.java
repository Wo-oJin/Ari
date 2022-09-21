package ari.paran.domain.repository;

import ari.paran.domain.board.Article;
import ari.paran.domain.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Article, Long> {
    Page<Article> findByTitleContaining(String searchKeyword, Pageable pageable);

    Optional<Article> findById(Long id);
}
