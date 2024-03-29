package ari.paran.service.auth;

import ari.paran.Util.SecurityUtil;
import ari.paran.domain.History;
import ari.paran.domain.SignupCode;
import ari.paran.domain.member.Member;
import ari.paran.domain.member.Authority;
import ari.paran.domain.repository.*;
import ari.paran.domain.store.FavoriteStore;
import ari.paran.domain.store.Store;
import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.dto.request.LoginDto;
import ari.paran.dto.request.SignupDto;
import ari.paran.dto.request.TokenRequestDto;
import ari.paran.dto.response.TokenDto;
import ari.paran.dto.response.store.LikeStoreListDto;
import ari.paran.jwt.TokenProvider;
import ari.paran.service.store.StoreService;
import ari.paran.service.store.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.util.UriComponentsBuilder;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final FavoriteStoreRepository favoriteRepository;
    private final StoreService storeService;
    private final SignupCodeRepository signupCodeRepository;
    private final EventRepository eventRepository;
    private final PartnershipRepository partnershipRepository;
    private final HistoryRepository historyRepository;
    private final Response response;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;
    private final JavaMailSender javaMailSender;

    /**
     * 가게 좋아요 추가/취소 시 해당 결과를 반영
     */
    @Transactional
    public ResponseEntity<?> toggleMemberFavoriteStore(Long memberId, Long storeId){
        /*1. 요청한 회원과 종아요(or 취소) 한 가게 객체를 가져옴*/
        Member member = getMemberInfoById(memberId);
        Store store = storeService.findStore(storeId);

        FavoriteStore favorite; // 존재하는 좋아요 정보나 새롭게 추가할 좋아요 정보가 담길 변수

        /*2. 회원이 해당 가게를 좋아요 했는지 여부를 판단 후 했다면 다음 조건 문 실행*/
        if(member.isFavoriteStore(store)) {
            favorite = favoriteRepository.findFavoriteStoreByMemberAndStore(member, store).orElseGet(null);

            member.deleteFavorite(favorite);
            favoriteRepository.delete(favorite);

            return response.success("즐겨찾기 목록에서 성공적으로 제거했습니다.");
        }

        /*3. 회원이 좋아요 하지 않았던 가게라면 회원과 가게 정보 담아 새롭게 좋아요 객체 생성 후 추가*/
        favorite = new FavoriteStore(member, store);

        member.addFavorite(favorite);
        store.addFavorite(favorite);

        favoriteRepository.save(favorite);

        return response.success("즐겨찾기 목록에 성공적으로 저장했습니다.");
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberInfoByEmail(String email){
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public Member getMemberInfoById(Long id){
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getMyInfo(){
        return memberRepository.findById(SecurityUtil.getCurrentMemberEmail())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    /**
     * 일반 사용자 회원가입 메소드
     */
    public boolean signupUser(SignupDto signUp) {

        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return false;
        }

        /* SignupDto를 통해 추가할 Member 객체 생성 및 저장 */
        Member member = signUp.toMember(passwordEncoder);
        memberRepository.save(member);

        return true;
    }

    /**
     * 사장님 회원가입 메소드
     */
    public boolean signupOwner(SignupDto signUp) {

        /* 해당 이메일 계정이 이미 존재하는지 확인*/
        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return false;
        }

        /* SignupDto를 통해 추가할 Member 객체 생성 및 저장 */
        Member member = signUp.toMember(passwordEncoder);
        member.changeRole(Authority.ROLE_OWNER); // 일반 사용자와 구분하기 위해 authority 변경
        memberRepository.save(member);

        /* SignupDto를 통해 추가할 Store 객체 생성 및 저장 */
        Store store = signUp.toStore(member, signUp.toAddress(signUp.getStoreRoadAddress(), signUp.getStoreDetailAddress()));

        SignupCode signupCode = signupCodeRepository.findByCode(signUp.getSignupCode()).get();
        signupCode.setActivatedTrue();
        signupCode.setMember(member);

        storeService.save(store);
        signupCodeRepository.save(signupCode);

        return true;
    }

    /**
     * 가게코드 인증
     */
    public ResponseEntity<?> authSignupCode(String code) {

        if (signupCodeRepository.existsByCode(code) == false || signupCodeRepository.findByCode(code).get().isActivated()) {
            return response.fail("유효하지 않은 가입코드 입니다.", HttpStatus.BAD_REQUEST);
        }

        return response.success();
    }

    /**
     * 이메일 중복 확인
     */
    public ResponseEntity<?> checkDupEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            return response.fail("이미 가입된 이메일입니다.", HttpStatus.OK);
        }
        return response.success();
    }

    /**
     * 인증코드 이메일 전송
     */
    @Transactional
    public ResponseEntity<?> sendEmail(String email) {
        String code = SecurityUtil.generateCode(); // 가입코드 생성

        /* 메일 제목과 내용 구성 */
        String subject = "Ari 인증을 위한 인증번호입니다.";
        String content="";
        content+= "<div style='margin:100px;'>";
        content+= "<h1> 안녕하세요 Ari입니다. </h1>";
        content+= "<br>";
        content+= "<p>아래 코드를 인증 창으로 돌아가 입력해주세요<p>";
        content+= "<br>";
        content+= "<p>감사합니다!<p>";
        content+= "<br>";
        content+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        content+= "<h3 style='color:blue;'>인증 코드입니다.</h3>";
        content+= "<div style='font-size:130%'>";
        content+= "CODE : <strong>";
        content+= code+"</strong><div><br/> ";
        content+= "</div>";

        /* JavaMailSender를 이용해 인증코드 전송 */
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setFrom("aritest0222@gmail.com");
            helper.setSubject(subject);
            helper.setText(content, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        log.info("인증코드: {}", code); //코드 확인용. 나중에 삭제해야함

        /* redis에 인증코드 5분간 보관 */
        redisTemplate.opsForValue()
                .set(code, email, 5*60000, TimeUnit.MILLISECONDS);

        return response.success();
    }

    /**
     * 가입코드 인증
     */
    public ResponseEntity<?> authEmail(String code) {
        String result = (String) redisTemplate.opsForValue().get(code); //redis에 입력한 코드가 있는지 확인

        /* 입력한 코드가 존재한다면 성공 메세지 반환 */
        if (result != null) {
            //이메일 확인용. 나중에 삭제해야함
            log.info("인증코드 해당 이메일: {}", result);
            return response.success();
        }

        return response.fail("인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
    }

    /**
     * 로그인
     */
    public ResponseEntity<?> login(LoginDto loginDto, int authFrom) throws URISyntaxException {

        Member member = memberRepository.findByEmail(loginDto.getEmail()).orElse(null);

        if(member == null){
            return response.fail("아이디 또는 비밀번호를 잘못 입력하셨습니다.", HttpStatus.BAD_REQUEST);
        }
        else if(!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())){
            if(authFrom != member.getFromOauth()){
                String[] authMethod = {"아리 플랫폼으로 ", "카카오 로그인 방식으로 ", "네이버 로그인 방식으로 "};
                String msg = "이미 " + authMethod[member.getFromOauth()] +"가입한 이메일입니다.";

                return response.fail(msg, HttpStatus.BAD_REQUEST);
            }
            else{
                return response.fail("아이디 또는 비밀번호를 잘못 입력하셨습니다.", HttpStatus.BAD_REQUEST);
            }
        }

        //1. Login id/pw를 기반으로 Authentication 객체 생성
        //이때 authentication는 인증 여부를 확인하는 authenticated 값이 false

        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        /* 실제 검증(사용자 비밀번호 체크)이 이루어지는 부분
         * authenticate 메서드가 실행될 때 CustomUserDetailService에서 만든 loadUserByUserName 메서드 실행
         */
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        /* 인증 정보를 기반으로 JWT 토큰 생성 */
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        /* RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리) */
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
                        tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

        /* user/owner에 따라 닉네임or가게이름 tokenDto에 추가 */
        if (member.getAuthority() == Authority.ROLE_USER) {
            tokenDto.setInfo(member.getNickname()); // 닉네임
        } else {
            tokenDto.setInfo(member.getStores().get(0).getName()); // 가게이름
        }

        return response.success(tokenDto, "로그인 성공!", HttpStatus.OK);
    }

    public ResponseEntity<?> reissue(TokenRequestDto reissue) {

        //1. refresh token 검증
        if (!tokenProvider.validateToken(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        //2. Access Token에서 User id을 가져옴
        Authentication authentication = tokenProvider.getAuthentication(reissue.getAccessToken());

        //3. redis에서 user id를 기반으로 저장된 refresh token 값을 가져옴
        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + authentication.getName());

        log.info("refresh Token: {}", refreshToken);

        //(추가) 로그아웃되어 redis에 refresh Token이 존재하지 않는 경우 처리
        if (ObjectUtils.isEmpty(refreshToken)) {
            return response.fail("잘못된 요청입니다", HttpStatus.BAD_REQUEST);
        }
        if (!refreshToken.equals(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        //4. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        //5. refresh token Redis 업데이트
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
                        tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

        return response.success(tokenDto, "토큰 정보가 갱신되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> logout(TokenRequestDto logout) {
        //1. Access Token 검증
        if (!tokenProvider.validateToken(logout.getAccessToken())) {
            return response.fail("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }

        //2. Access Token에서 User email을 가져옴
        Authentication authentication = tokenProvider.getAuthentication(logout.getAccessToken());

        //3. Redis에서 해당 User email로 저장된 refresh token이 있는지 여부를 확인 후, 있을 경우 삭제
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            //refresh token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }

        //4. 해당 access token 유효시간 가지고 와서 BlackList로 저장
        Long expiration = tokenProvider.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

        return response.success("로그아웃 되었습니다");
    }

    public ResponseEntity<?> changePassword(String email, String newPassword) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.orElse(null) == null) {
            return response.fail("이메일을 다시 입력해주세요.", HttpStatus.BAD_REQUEST);
        }

        member.get().changePassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member.get());

        return response.success("패스워드가 성공적으로 변경되었습니다.");
    }

    /**
     * 즐겨찾는 가게 목록 리스트를 반환
     */
    public ResponseEntity<?> showLikeList(Principal principal) throws IOException {
        /*1. 요청보낸 회원의 객체 가져온다*/
        Member member = memberRepository.findById(Long.valueOf(principal.getName())).get();
        List<FavoriteStore> favorites = member.getFavoriteStores();
        List<LikeStoreListDto> data = new ArrayList<>(); //즐겨찾기 해놓은 가게들이 담길 LikeStoreListDto 리스트 변수

        /*2. 반복문을 통해 좋아요 가게들에 대한 dto를 만든 뒤 data에 추가한다*/
        for (FavoriteStore favorite : favorites) {
            data.add(LikeStoreListDto.builder()
                            .name(favorite.getStore().getName())
                            .storeId(favorite.getStore().getId())
                            .address(favorite.getStore().getAddress().getRoadAddress())
                            .image(fileService.getMainStoreImage(favorite.getStore()))
                    .build());
        }
        log.info("좋아요 가게 개수: {}", data.size());

        return response.success(data, "좋아요 가게 목록", HttpStatus.OK);
    }

    public ResponseEntity<?> getEventNum(Principal principal) {

        Member owner = memberRepository.findById(Long.valueOf(principal.getName())).get();
        List<Long> result = new ArrayList<>();
        Long eventNum = 0L;
        Long partnershipNum = 0L;

        List<Store> stores = owner.getStores();
        for (Store store : stores) {
            eventNum += eventRepository.countByStore(store);
            partnershipNum += partnershipRepository.countByStore(store);
        }

        result.add(partnershipNum);
        result.add(eventNum);

        return response.success(result, "이벤트 갯수", HttpStatus.OK);
    }

    public ResponseEntity<?> getHistory(Long memberId) {

        Member member = memberRepository.findById(memberId).orElse(null);

        log.info("member null 여부: {}", member.getId());

        List<History> historyList = historyRepository.findAllByMember(member);

        log.info("이벤트 null 여부: {}", historyList.isEmpty());

        return response.success(historyList, "방문 기록 리스트", HttpStatus.OK);

    }



}
