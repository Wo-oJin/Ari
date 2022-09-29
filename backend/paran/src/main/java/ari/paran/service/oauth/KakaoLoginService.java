package ari.paran.service.oauth;

import ari.paran.domain.member.Member;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.dto.request.SignupDto;
import ari.paran.service.auth.MemberService;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpSession;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoLoginService {

    private final static String KAKAO_CLIENT_ID = "6ba9808d7a83807d2d0ddc97b41c8889";
    private final static String KAKAO_CLIENT_SECRET = "lNrtpw0rVlsGF3afrTh6xQdROxEp2fhC";
    private final static String KAKAO_REDIRECT_URI = "http://paran-ari.com/auth/kakao/login"; //Redirect URL
    private final static String RESOURCE_SERVER_URL = "https://kapi.kakao.com/v2/user/me";
    private final static String SESSION_STATE = "kakao_oauth_state";

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 코드 발급
    public String getAuthorizationUrl(HttpSession session) {
        String state = generateRandomString();
        setSession(session, state);

        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(KAKAO_CLIENT_ID)
                .callback(KAKAO_REDIRECT_URI)
                .state(state).build(KakaoOAuthApi.instance());

        return oauthService.getAuthorizationUrl();
    }

    // access token 발급
    public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws Exception {
        //String sessionState = getSession(session);

        //if (sessionState.equals(state)) {
            OAuth20Service oauthService = new ServiceBuilder()
                    .apiKey(KAKAO_CLIENT_ID)
                    .callback(KAKAO_REDIRECT_URI)
                    .apiSecret(KAKAO_CLIENT_SECRET)
                    .state(state).build(KakaoOAuthApi.instance());

            OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
            return accessToken;
        //}

        //return null;
    }

    // user 정보 가져오기
    public Map<String, String> getUserProfile(OAuth2AccessToken oauthToken) throws Exception {
        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(KAKAO_CLIENT_ID)
                .callback(KAKAO_REDIRECT_URI)
                .build(KakaoOAuthApi.instance());

        OAuthRequest request = new OAuthRequest(Verb.GET, RESOURCE_SERVER_URL, oauthService);
        oauthService.signRequest(oauthToken, request);

        Response response = request.send();
        String body = response.getBody();

        Map<String, Map<String, String>> attributes = new HashMap<>();
        attributes = new Gson().fromJson(body, attributes.getClass());

        Map<String, String> account = attributes.get("kakao_account");

        String email = account.get("email");
        String nickname = Arrays.asList(email.split("@")).get(0);
        String gender = account.get("gender");
        String age = account.get("age_range").substring(0,2);

        Map<String, String> profile = new HashMap<>();

        profile.put("email", email);

        String password = nickname+gender+email+age;
        profile.put("password", password);

        Member member = memberRepository.findByEmail(email).orElse(null);
        if(member == null || member.getFromOauth() == 1) {
            log.info("카카오 로그인 성공!");
            SignupDto form = SignupDto.builder()
                    .email(email)
                    .password(password)
                    .nickname(nickname)
                    .gender(gender)
                    .age(Integer.valueOf(age))
                    .fromOauth(1)
                    .build();

            memberService.signupUser(form);
        }else {
            log.info("카카오 로그인 실패!");
            String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/redirectLogin")
                    .queryParam("loginFail", "{lf}")
                    .encode()
                    .buildAndExpand(true)
                    .toUriString();

            profile.put("fail", redirectUrl);
        }

        return profile;
    }

    // 세션 유효성 검증을 위한 난수
    private String generateRandomString() {
        return UUID.randomUUID().toString();
    }

    // 생성한 난수 값을 session에 저장
    private void setSession(HttpSession session, String state) {
        session.setAttribute(SESSION_STATE, state);
    }

    private String getSession(HttpSession session) {
        return (String) session.getAttribute(SESSION_STATE);
    }
}
