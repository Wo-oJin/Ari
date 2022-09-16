package ari.paran.domain.repository;

import ari.paran.domain.board.ArticleImgFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleImgFilesRepository extends JpaRepository<ArticleImgFile, Long> {
}
