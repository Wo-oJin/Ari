package ari.paran.domain.repository;

import ari.paran.domain.store.ImgFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImgFileRepository extends JpaRepository<ImgFile, Long> {

}
