package ari.paran.controller;

import ari.paran.dto.Response;
import ari.paran.dto.response.TokenDto;
import ari.paran.service.oauth.KakaoLoginService;
import ari.paran.service.oauth.NaverLoginService;
import ari.paran.dto.request.LoginDto;
import ari.paran.service.auth.MemberService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class OAuthController {
    private final KakaoLoginService kakaoLoginService;
    private final NaverLoginService naverLoginService;
    private final MemberService memberService;
    private final Response response;

    @GetMapping("/auth/login")
    public Map<String, String> oauthLogin(HttpSession httpSession){
        String kakaoCodeUrl = kakaoLoginService.getAuthorizationUrl(httpSession);
        String naverCodeUrl = naverLoginService.getAuthorizationUrl(httpSession);

        Map<String, String> urlMap = new HashMap<>();
        urlMap.put("kakao", kakaoCodeUrl);
        urlMap.put("naver", naverCodeUrl);

        return urlMap;
    }

    @PostMapping("/auth/kakao/login")
    public ResponseEntity<?> kakaoCallback(HttpSession session, @RequestBody Map<String,Object> paramMap) throws Exception {

        String code = String.valueOf(paramMap.get("code"));
        String state = String.valueOf(paramMap.get("state"));
        OAuth2AccessToken token = kakaoLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = kakaoLoginService.getUserProfile(token);

        if(apiResult.containsKey("fail")) {
            /*
            URI redirectUri = new URI(apiResult.get("fail"));

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);

            log.info("리다이렉트 = {}", redirectUri.toString());


            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
             */

            return response.fail("로그인 실패(중복된 이메일이 존재)", HttpStatus.BAD_REQUEST);
        }
        else {
            LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

            return memberService.login(loginDto);
        }
    }

    @PostMapping("/auth/naver/login")
    public ResponseEntity<?> NaverCallback(HttpSession session, @RequestBody Map<String, Object> paramMap) throws Exception {

        String code = String.valueOf(paramMap.get("code"));
        String state = String.valueOf(paramMap.get("state"));
        OAuth2AccessToken token = naverLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = naverLoginService.getUserProfile(token);

        if(apiResult.containsKey("fail")) {
            /*
            URI redirectUri = new URI(apiResult.get("fail"));

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);

            log.info("리다이렉트 = {}", redirectUri.toString());


            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
             */

            return response.fail("로그인 실패(중복된 이메일이 존재)", HttpStatus.BAD_REQUEST);
        }
        else {
            LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

            return memberService.login(loginDto);
        }
    }

}