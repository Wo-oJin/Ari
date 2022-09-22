package ari.paran.domain.repository;

import ari.paran.domain.store.FavoriteStore;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;


public interface FavoriteStoreRepository extends JpaRepository<FavoriteStore, Long> {
    Optional<FavoriteStore> findFavoriteStoreByMemberAndStore(Member member, Store store);
}


