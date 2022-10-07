package ari.paran.service;

import ari.paran.domain.History;
import ari.paran.domain.SignupCode;
import ari.paran.domain.member.Member;
import ari.paran.domain.repository.HistoryRepository;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.domain.repository.SignupCodeRepository;
import ari.paran.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class HistoryService {

    private final MemberRepository memberRepository;
    private final SignupCodeRepository signupCodeRepository;
    private final HistoryRepository historyRepository;
    private final Response response;

    public ResponseEntity<?> checkStoreCode(Long ownerId, String code) {

        Member owner = memberRepository.findById(ownerId).orElse(null);
        SignupCode signupCode = signupCodeRepository.findSignupCodeByMember(owner).orElse(null);

        if (signupCode.getCode() == null || !code.equals(signupCode.getCode())) {
            log.info("사장님 코드: {}, 입력 코드: {}", signupCode.getCode(), code);
            return response.fail("코드가 일치하지 않습니다.", HttpStatus.OK);
        } else {
            return response.success(null, "코드가 일치합니다.", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> recordButtonHistory(Long memberId, String storeName, String eventInfo) {

        Member member = memberRepository.findById(memberId).orElse(null);
        History history = new History(member, storeName, eventInfo);

        historyRepository.save(history);

        return response.success();
    }

    public ResponseEntity<?> recordCodeHistory(Long memberId, String storeName, String eventInfo) {

        Member member = memberRepository.findById(memberId).orElse(null);
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        log.info("현재시간: {}", now);
        History history = new History(member, now, storeName, eventInfo);

        historyRepository.save(history);

        return response.success();
    }


}
