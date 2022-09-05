package ari.paran.domain.repository;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Favorite;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findFavoriteByMemberAndStore(Member member, Store store);

}

