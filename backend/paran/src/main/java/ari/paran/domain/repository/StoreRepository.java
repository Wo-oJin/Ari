package ari.paran.domain.repository;

import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByName(String name);
    Optional<Store> findById(Long name);

    // findByCategoryContaining으로 대체 가능
    @Query("SELECT s FROM Store s WHERE s.category LIKE :category%")
    List<Store> findByCategory(@Param("category") String category);

    // findByNameContaining으로 대체 가능
    @Query("SELECT s FROM Store s WHERE s.name LIKE CONCAT('%',:keyword,'%')")
    List<Store> findByKeyword(@Param("keyword") String keyword);

    List<Store> findByNameContaining(String name);
}