package ari.paran.domain.repository;

import ari.paran.domain.store.StoreImgFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreImgFileRepository extends JpaRepository<StoreImgFile, Long> {

}
