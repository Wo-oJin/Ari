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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpSession;
import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NaverLoginService {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private static int cnt = 1;

    @Value("${NAVER_CLIENT_ID}")
    private String NAVER_CLIENT_ID;
    @Value("${NAVER_CLIENT_SECRET}")
    private String NAVER_CLIENT_SECRET;
    @Value("${NAVER_REDIRECT_URI}")
    private String NAVER_REDIRECT_URI;

    @Value("${OAUTH_USER_PW}")
    private String password;
    private final String RESOURCE_SERVER_URL = "https://openapi.naver.com/v1/nid/me";
    private final String SESSION_STATE = "naver_oauth_state";

    // 코드 발급
    public String getAuthorizationUrl(HttpSession session) {
        String state = generateRandomString();
        setSession(session, state);

        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(NAVER_CLIENT_ID)
                .callback(NAVER_REDIRECT_URI)
                .state(state).build(NaverOAuthApi.instance());

        return oauthService.getAuthorizationUrl();
    }

    // access token 발급
    public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws Exception {
        //String sessionState = getSession(session);
        //if (sessionState.equals(state)) {
            OAuth20Service oauthService = new ServiceBuilder()
                    .apiKey(NAVER_CLIENT_ID)
                    .callback(NAVER_REDIRECT_URI)
                    .apiSecret(NAVER_CLIENT_SECRET)
                    .state(state).build(NaverOAuthApi.instance());

            OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
            return accessToken;
       // }

        //return null;
    }

    public Map<String, String> getUserProfile(OAuth2AccessToken oauthToken) throws Exception {

        // 1. access token을 이용해 user profile 요청
        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(NAVER_CLIENT_ID)
                .callback(NAVER_REDIRECT_URI)
                .build(NaverOAuthApi.instance());

        OAuthRequest request = new OAuthRequest(Verb.GET, RESOURCE_SERVER_URL, oauthService);
        oauthService.signRequest(oauthToken, request);

        Response response = request.send();

        // 2. 전달받은 user profile 분해 //
        String body = response.getBody();

        Map<String, Map<String, String>> attributes = new HashMap<>();
        attributes = new Gson().fromJson(body, attributes.getClass());

        Map<String, String> account = attributes.get("response");

        // 닉네임은 필수 제공값
        String nickname = account.get("nickname");

        // 이메일 설정
        String email = account.get("email");
        if(email == null){
            email = nickname + cnt;
            cnt++;
        }

        // 연령대 설정
        String ageRange = account.get("age");
        int age = -1;
        if(ageRange != null)
            age = Integer.valueOf(ageRange.substring(0,2));

        // 성별 설정
        String gender = account.get("gender");
        if(gender != null && gender.equals("M"))
            gender = "male";
        else if(gender != null && gender.equals("F"))
            gender = "female";


        // 3. 회원가입 처리 및 loginDto 작성
        Map<String, String> loginInfo = new HashMap<>();

        loginInfo.put("email", email);
        loginInfo.put("password", password);

        Member member = memberRepository.findByEmail(email).orElse(null);
        if(member == null || member.getFromOauth() == 2) {
            SignupDto form = SignupDto.builder()
                    .email(email)
                    .password(password)
                    .nickname(nickname)
                    .gender(gender)
                    .age(age)
                    .fromOauth(2)
                    .build();

            memberService.signupUser(form);
        }

        return loginInfo;
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
