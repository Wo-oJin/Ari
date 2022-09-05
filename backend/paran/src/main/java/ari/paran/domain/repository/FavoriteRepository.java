package ari.paran.domain.repository;

import ari.paran.domain.store.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByMemberAndStore(Member member, Store store);
}


