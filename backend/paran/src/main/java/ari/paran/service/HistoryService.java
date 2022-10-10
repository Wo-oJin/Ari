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

    /**
     * ownerId에 해당하는 signup_code의 값이 파라미터의 code와 동일한지 체크
     */
    public ResponseEntity<?> checkStoreCode(Long ownerId, String code) {
        /*1. ownerId를 통해 해당 owner의 가입 코드를 찾는다.*/
        Member owner = memberRepository.findById(ownerId).orElse(null);
        SignupCode signupCode = signupCodeRepository.findSignupCodeByMember(owner).orElse(null);

        /*2. signupCode 객체에서 code값을 가져온 뒤 요청 시 보낸 code값과 비교한다.*/
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

    /**
     * 가입시 인증코드를 이용한 방문기록 api
     */
    public ResponseEntity<?> recordCodeHistory(Long memberId, String storeName, String eventInfo) {
        /*1. 요청보낸 member의 id를 통해 해당 member 객체를 가져온다.*/
        Member member = memberRepository.findById(memberId).orElse(null);

        /*2. 현재 시간을 "yyyy-MM-dd HH:mm:ss" 형식의 String 형식으로 저장한다.*/
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        log.info("현재시간: {}", now);

        /*3. 회원, 현재시간, 가게이름, 이벤트 내용의 정보를 담아 저장한다.*/
        History history = new History(member, now, storeName, eventInfo);

        historyRepository.save(history);

        return response.success();
    }


}
