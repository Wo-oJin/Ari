package ari.paran.domain.repository;

import ari.paran.domain.SignupCode;
import ari.paran.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface SignupCodeRepository extends JpaRepository<SignupCode, Long> {
    Optional<SignupCode> findByCode(String code);
    boolean existsByCode(String code);

    Optional<SignupCode> findSignupCodeByMember(Member member);
}