package ari.paran.domain.Repository;

import ari.paran.domain.store.ImgFiles;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

}
