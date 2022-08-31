package ari.paran.service.oauth;

import ari.paran.domain.member.Member;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.dto.request.SignupDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserOAuth2Service extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User user = super.loadUser(userRequest);
        Map<String, Object> attributes = user.getAttributes();

        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");

        String email = (String) kakao_account.get("email");
        String nickname = Arrays.asList(email.split("@")).get(0);
        String gender = (String)kakao_account.get("gender");
        String age = ((String)kakao_account.get("age_range")).substring(0,2);
        String password = nickname+gender+email+age;

        if(!memberRepository.existsByEmail(email)) {
            SignupDto signUpDto = SignupDto.builder()
                    .email(email)
                    .password(password)
                    .nickname(nickname)
                    .age(Integer.parseInt(age))
                    .gender(gender)
                    .build();

            Member member = signUpDto.toMember(this.passwordEncoder);
            memberRepository.save(member);
        }

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes, "id");
    }
}
