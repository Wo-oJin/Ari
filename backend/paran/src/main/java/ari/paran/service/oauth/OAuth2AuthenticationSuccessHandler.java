package ari.paran.service.oauth;

import ari.paran.domain.member.Authority;
import ari.paran.domain.member.Member;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.dto.response.TokenDto;
import ari.paran.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();

        Map<String, Object> kakao_account = (Map<String, Object>) user.getAttributes().get("kakao_account");
        String email = (String) kakao_account.get("email");

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
                        tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

        Member member = memberRepository.findByEmail(email).orElse(null);

        if (member.getAuthority() == Authority.ROLE_USER) {
            tokenDto.setInfo(member.getNickname()); // 닉네임
        } else {
            tokenDto.setInfo(member.getStores().get(0).getName()); // 가게이름
        }

        String url = makeRedirectUrl(tokenDto.getAccessToken());
        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String token) {
        return UriComponentsBuilder.fromUriString("http://localhost:3000/redirectLogin"+token)
                .build().toUriString();
    }
}
