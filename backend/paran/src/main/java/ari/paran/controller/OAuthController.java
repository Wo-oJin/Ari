package ari.paran.controller;

import ari.paran.dto.response.TokenDto;
import ari.paran.service.oauth.KakaoLoginService;
import ari.paran.service.oauth.NaverLoginService;
import ari.paran.dto.request.LoginDto;
import ari.paran.service.auth.MemberService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class OAuthController {
    private final KakaoLoginService kakaoLoginService;
    private final NaverLoginService naverLoginService;
    private final MemberService memberService;

    @GetMapping("/auth/login")
    @ResponseBody
    public Map<String, String> oauthLogin(HttpSession httpSession){
        String kakaoCodeUrl = kakaoLoginService.getAuthorizationUrl(httpSession);
        String naverCodeUrl = naverLoginService.getAuthorizationUrl(httpSession);

        Map<String, String> urlMap = new HashMap<>();
        urlMap.put("kakao", kakaoCodeUrl);
        urlMap.put("naver", naverCodeUrl);

        return urlMap;
    }

    @GetMapping("/auth/kakao/login")
    public ResponseEntity<?> kakaoCallback(HttpSession session, @RequestParam String code, @RequestParam String state, RedirectAttributes redirectAttributes) throws Exception {

        OAuth2AccessToken token = kakaoLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = kakaoLoginService.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return memberService.login(loginDto);
    }

    @ResponseBody
    @GetMapping("/auth/naver/login")
    public ResponseEntity<?> NaverCallback(HttpSession session, @RequestParam String code, @RequestParam String state) throws Exception {

        OAuth2AccessToken token = naverLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = naverLoginService.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return memberService.login(loginDto);
    }

}