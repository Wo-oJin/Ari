package ari.paran.domain.repository;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Category;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findById(Long name);

    /*
    join fetch는 MultipleBagFetchException 때문에 2번 이상 연속 사용 불가능함.
    spring.jpa.properties.hibernate.default_batch_fetch_size=1000을 설정해 여러 개의 쿼리를 in으로 묶어 실행해 n+1을 조금이나마 해결 가능함
    */

    @Query("SELECT DISTINCT s FROM Store s JOIN FETCH s.eventList")
    List<Store> findAllStoreEvents();

    @Query(value = "SELECT DISTINCT s FROM Store s JOIN FETCH s.eventList WHERE s.category = :category")
    List<Store> findByCategory(@Param("category") Category category);

    @Query(value = "SELECT DISTINCT s FROM Store s JOIN FETCH s.eventList WHERE s.name LIKE CONCAT('%',:keyword,'%')")
    List<Store> findStoreByKeyword(@Param("keyword") String keyword);


    // join fetch의 대상이 되는 member가 where절에 사용되었으므로 join fetch 사용 불가능(db 일관성이 깨짐)
    @Query(value = "SELECT s FROM Store s WHERE s.name = :storeName AND s.member = :member")
    Store findStoreByNameAndMember(@Param("storeName") String name,
                                   @Param("member") Member member);

}