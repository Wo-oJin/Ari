package ari.paran.service.auth;

import ari.paran.Util.SecurityUtil;
import ari.paran.domain.member.Member;
import ari.paran.domain.member.Authority;
import ari.paran.domain.repository.FavoriteRepository;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.domain.repository.SignupCodeRepository;
import ari.paran.domain.store.Favorite;
import ari.paran.domain.store.Store;
import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.dto.request.LoginDto;
import ari.paran.dto.request.SignupDto;
import ari.paran.dto.request.TokenRequestDto;
import ari.paran.dto.response.TokenDto;
import ari.paran.dto.response.store.LikeListDto;
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
    private final FavoriteRepository favoriteRepository;
    private final StoreService storeService;
    private final SignupCodeRepository signupCodeRepository;
    private final Response response;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;
    private final JavaMailSender javaMailSender;

    @Transactional
    public ResponseEntity<?> toggleMemberFavoriteStore(Long memberId, Long storeId){
        Member member = getMemberInfoById(memberId);
        Store store = storeService.findStore(storeId);

        Favorite favorite;

        if(member.isFavoriteStore(store)) {
            favorite = favoriteRepository.findFavoriteByMemberAndStore(member, store).orElseGet(null);

            member.deleteFavorite(favorite);
            favoriteRepository.delete(favorite);

            return response.success("찜 목록에서 성공적으로 제거했습니다.");
        }

        favorite = new Favorite(member, store);

        member.addFavorite(favorite);
        store.addFavorite(favorite);

        favoriteRepository.save(favorite);

        return response.success("찜 목록에 성공적으로 저장했습니다.");
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
    public ResponseEntity<?> signupUser(SignupDto signUp) {
        /* 해당 이메일 계정이 이미 존재하는지 확인*/
        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return response.fail("이미 회원가입된 이메일입니다.", HttpStatus.BAD_REQUEST);
        }

        /* SignupDto를 통해 추가할 Member 객체 생성 및 저장 */
        Member member = signUp.toMember(passwordEncoder);
        memberRepository.save(member);

        return response.success("회원가입에 성공했습니다.");
    }

    /**
     * 사장님 회원가입 메소드
     */
    public ResponseEntity<?> signupOwner(SignupDto signUp) {
        /* 해당 이메일 계정이 이미 존재하는지 확인*/
        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return response.fail("이미 회원가입된 이메일입니다.", HttpStatus.BAD_REQUEST);
        }

        /* SignupDto를 통해 추가할 Member 객체 생성 및 저장 */
        Member member = signUp.toMember(passwordEncoder);
        member.changeRole(Authority.ROLE_OWNER); // 일반 사용자와 구분하기 위해 authority 변경
        memberRepository.save(member);

        /* SignupDto를 통해 추가할 Store 객체 생성 및 저장 */
        Store store = signUp.toStore(member, signUp.toAddress(signUp.getStoreRoadAddress(), signUp.getStoreDetailAddress()));

        storeService.save(store);

        return response.success("회원가입에 성공했습니다.");
    }

    /**
     * 가게코드 인증
     */
    public ResponseEntity<?> authSignupCode(String code) {

        if (signupCodeRepository.existsByCode(code) == false ) {
            return response.fail("유효하지 않은 가입코드 입니다.", HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<?> login(LoginDto loginDto) throws URISyntaxException {

        Optional<Member> member = memberRepository.findByEmail(loginDto.getEmail());

        if (member.orElse(null) == null || !passwordEncoder.matches(loginDto.getPassword(), member.get().getPassword())) {
            return null;
        }

        Member findMember = member.orElseGet(null);
        Store store = Store.builder()
                .name("우진이의 가게")
                .member(findMember)
                .build();
        findMember.addStore(store);
        storeService.save(store);

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
        if (member.get().getAuthority() == Authority.ROLE_USER) {
            tokenDto.setInfo(member.get().getNickname()); // 닉네임
        } else {
            tokenDto.setInfo(member.get().getStore().getName()); // 가게이름
        }

        String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/redirectLogin/")
                .queryParam("accessToken", "{at}")
                .queryParam("refreshToken", "{rt}")
                .queryParam("authority", "{authority}")
                .queryParam("accessTokenExpireIn", "{atExp}")
                .queryParam("refreshTokenExpireIn", "{rtExp}")
                .queryParam("info", "{info}")
                .encode()
                .buildAndExpand(tokenDto.getAccessToken(), tokenDto.getRefreshToken(),tokenDto.getAuthority(),
                        tokenDto.getAccessTokenExpireIn(), tokenDto.getRefreshTokenExpiresIn(), tokenDto.getInfo())
                .toUriString();

        URI redirectUri = new URI(redirectUrl);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
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

    public ResponseEntity<?> showLikeList(Principal principal) throws IOException {
        Member member = memberRepository.findById(Long.valueOf(principal.getName())).get();
        List<Favorite> favorites = member.getFavorites();
        List<LikeListDto> data = new ArrayList<>();
        for (Favorite favorite : favorites) {
            data.add(LikeListDto.builder()
                            .name(favorite.getStore().getName())
                            .address(favorite.getStore().getAddress().getRoadAddress())
                            .image(fileService.getMainImage(favorite.getStore()))
                    .build());
        }
        log.info("좋아요 가게 개수: {}", data.size());

        return response.success(data, "좋아요 가게 목록", HttpStatus.OK);
    }

    public ResponseEntity<?> addLike(String storeName, Principal principal) {
        Member member = memberRepository.findById(Long.valueOf(principal.getName())).get();
        Store store = storeService.findByName(storeName);

        Favorite like = new Favorite(member, store);

        member.getFavorites().add(like);
        memberRepository.save(member);

        return response.success();
    }

    public ResponseEntity<?> deleteLike(String storeName, Principal principal) {
        Member member = memberRepository.findById(Long.valueOf(principal.getName())).get();
        Store store = storeService.findByName(storeName);
        Favorite like = favoriteRepository.findFavoriteByMemberAndStore(member, store).get();

        favoriteRepository.delete(like);

        return response.success();
    }

}
