package ari.paran.controller;

import ari.paran.auth.KakaoLogin;
import ari.paran.auth.NaverLogin;
import ari.paran.dto.request.LoginDto;
import ari.paran.service.MemberService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class OAuthController {
    private final KakaoLogin kakaoLogin;
    private final NaverLogin naverLogin;
    private final MemberService memberService;

    @ResponseBody
    @GetMapping("/auth/kakao/login")
    public ResponseEntity<?> kakaoCallback(HttpSession session, @RequestParam String code, @RequestParam String state, RedirectAttributes redirectAttributes) throws Exception {

        OAuth2AccessToken token = kakaoLogin.getAccessToken(session, code, state);

        Map<String, String> apiResult = kakaoLogin.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return ResponseEntity.ok(memberService.login(loginDto));
    }

    @ResponseBody
    @GetMapping("/auth/naver/login")
    public ResponseEntity<?> NaverCallback(HttpSession session, @RequestParam String code, @RequestParam String state) throws Exception {

        OAuth2AccessToken token = naverLogin.getAccessToken(session, code, state);

        Map<String, String> apiResult = naverLogin.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return ResponseEntity.ok(memberService.login(loginDto));
    }

}