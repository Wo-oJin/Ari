package ari.paran.domain.repository;

import ari.paran.domain.History;
import ari.paran.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query(value = "SELECT h FROM History h WHERE h.member = :member")
    List<History> findAllByMember(@Param("member") Member member);
}
