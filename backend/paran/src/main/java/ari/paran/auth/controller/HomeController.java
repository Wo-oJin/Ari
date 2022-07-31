package ari.paran.auth.controller;

import ari.paran.auth.KakaoLogin;
import ari.paran.auth.NaverLogin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@RequestMapping("/auth")
public class HomeController {

    @Autowired
    private KakaoLogin kakaoLogin;

    @Autowired
    private NaverLogin naverLogin;

    @GetMapping({"/", "/home"})
    public String signin(HttpSession httpSession, Model model){

        return "home";
    }

    @GetMapping("/kakao_login")
    public String kakaoLogin(HttpSession httpSession, Model model){
        // code를 받을 수 있는 인증 URL 반환
        String codeUrl = kakaoLogin.getAuthorizationUrl(httpSession);
        model.addAttribute("kakao_url", codeUrl);

        return "kakao_login";
    }

    @GetMapping("/naver_login")
    public String naverLogin(HttpSession httpSession, Model model){

        // code를 받을 수 있는 인증 URL 반환
        String codeUrl = naverLogin.getAuthorizationUrl(httpSession);
        model.addAttribute("naver_url", codeUrl);

        return "naver_login";
    }

}
