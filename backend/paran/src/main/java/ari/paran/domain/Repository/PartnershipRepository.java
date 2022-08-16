package ari.paran.domain.Repository;

import ari.paran.domain.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface PartnershipRepository extends JpaRepository<Partnership, Long> {

    @Query("SELECT p FROM Partnership p WHERE p.store.name = ?1")
    List<Partnership> selectByStoreName(String storeName);
}
