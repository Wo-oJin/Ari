package ari.paran.controller;

import ari.paran.service.oauth.KakaoLoginService;
import ari.paran.service.oauth.NaverLoginService;
import ari.paran.dto.request.LoginDto;
import ari.paran.service.MemberService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class OAuthController {
    private final KakaoLoginService kakaoLoginService;
    private final NaverLoginService naverLoginService;
    private final MemberService memberService;

    @GetMapping("auth/kakao_login")
    public String kakaoLogin(HttpSession httpSession, Model model){
        // code를 받을 수 있는 인증 URL 반환
        String codeUrl = kakaoLoginService.getAuthorizationUrl(httpSession);
        model.addAttribute("kakao_url", codeUrl);

        return "kakao_login";
    }

    @GetMapping("auth/naver_login")
    public String naverLogin(HttpSession httpSession, Model model){

        // code를 받을 수 있는 인증 URL 반환
        String codeUrl = naverLoginService.getAuthorizationUrl(httpSession);
        model.addAttribute("naver_url", codeUrl);

        return "naver_login";
    }

    @ResponseBody
    @GetMapping("/auth/kakao/login")
    public ResponseEntity<?> kakaoCallback(HttpSession session, @RequestParam String code, @RequestParam String state, RedirectAttributes redirectAttributes) throws Exception {

        OAuth2AccessToken token = kakaoLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = kakaoLoginService.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return ResponseEntity.ok(memberService.login(loginDto));
    }

    @ResponseBody
    @GetMapping("/auth/naver/login")
    public ResponseEntity<?> NaverCallback(HttpSession session, @RequestParam String code, @RequestParam String state) throws Exception {

        OAuth2AccessToken token = naverLoginService.getAccessToken(session, code, state);

        Map<String, String> apiResult = naverLoginService.getUserProfile(token);

        LoginDto loginDto = new LoginDto(apiResult.get("email"), apiResult.get("password"));

        return ResponseEntity.ok(memberService.login(loginDto));
    }

}