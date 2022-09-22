package ari.paran.domain.repository;

import ari.paran.domain.board.Article;
import ari.paran.domain.board.FavoriteArticle;
import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteArticleRepository extends JpaRepository<FavoriteArticle, Long> {

    Optional<FavoriteArticle> findFavoriteArticleByMemberAndArticle(Member member, Article article);
}
