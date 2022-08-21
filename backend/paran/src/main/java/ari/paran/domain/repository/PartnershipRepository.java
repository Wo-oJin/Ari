package ari.paran.domain.repository;

import ari.paran.domain.store.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface PartnershipRepository extends JpaRepository<Partnership, Long> {

    @Query("SELECT p FROM Partnership p INNER JOIN p.store s WHERE s.name = ?1")
    List<Partnership> selectByStoreName(String storeName);

}
