package ari.paran.service;

import ari.paran.Util.SecurityUtil;
import ari.paran.domain.Authority;
import ari.paran.domain.Member;
import ari.paran.domain.MemberRepository;
import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.dto.request.LoginDto;
import ari.paran.dto.request.SignupDto;
import ari.paran.dto.request.TokenRequestDto;
import ari.paran.dto.response.TokenDto;
import ari.paran.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.concurrent.TimeUnit;


@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final Response response;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberInfo(String email){
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getMyInfo(){
        return memberRepository.findById(SecurityUtil.getCurrentMemberEmail())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    public ResponseEntity<?> signUp(SignupDto signUp) {
        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return response.fail("이미 회원가입된 이메일입니다.", HttpStatus.BAD_REQUEST);
        }

        Member member = Member.builder()
                .username(signUp.getUsername())
                .email(signUp.getEmail())
                .password(passwordEncoder.encode(signUp.getPassword()))
                .email(signUp.getEmail())
                .nickname(signUp.getNickname())
                .gender(signUp.getGender())
                .age(signUp.getAge())
                .authority(signUp.getAuthority())
                .build();
        memberRepository.save(member);

        return response.success("회원가입에 성공했습니다.");
    }

    public ResponseEntity<?> login(LoginDto loginDto) {

        if (memberRepository.findByEmail(loginDto.getEmail()).orElse(null) == null) {
            return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        //1. Login id/pw를 기반으로 Authentication 객체 생성
        //이때 authentication는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        //2. 실제 검증(사용자 비밀번호 체크)이 이루어지는 부분
        //authenticate 메서드가 실행될 때 CustomUserDetailService에서 만든 loadUserByUserName 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        //4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
        redisTemplate.opsForValue()
                .set("RT" + authentication.getName(), tokenDto.getRefreshToken(),
                        tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

        return response.success(tokenDto, "로그인에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> reissue(TokenRequestDto reissue) {
        //1. refresh token 검증
        if (!tokenProvider.validateToken(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        //2. Access Token에서 User email을 가져옴
        Authentication authentication = tokenProvider.getAuthentication(reissue.getAccessToken());

        //3. redis에서 user email을 기반으로 저장된 refresh token 값을 가져옴
        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + authentication.getName());

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

}
