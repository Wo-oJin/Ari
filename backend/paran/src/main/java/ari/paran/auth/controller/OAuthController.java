package ari.paran.auth.controller;

import ari.paran.auth.KakaoLogin;
import ari.paran.auth.NaverLogin;
import ari.paran.service.AuthService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Slf4j
@Controller
@AllArgsConstructor
public class OAuthController {
    private final KakaoLogin kakaoLogin;
    private final NaverLogin naverLogin;

    @ResponseBody
    @GetMapping("/auth/kakao/login")
    public Map<String, String> kakaoCallback(HttpSession session, @RequestParam String code, @RequestParam String state, RedirectAttributes redirectAttributes) throws Exception {

        OAuth2AccessToken token = kakaoLogin.getAccessToken(session, code, state);

        Map<String, String> apiResult = kakaoLogin.getUserProfile(token);

        return apiResult;
    }

    @ResponseBody
    @GetMapping("/auth/naver/login")
    public Map<String, String> NaverCallback(HttpSession session, @RequestParam String code, @RequestParam String state) throws Exception {

        OAuth2AccessToken token = naverLogin.getAccessToken(session, code, state);

        Map<String, String> apiResult = naverLogin.getUserProfile(token);

        return apiResult;
    }

}
