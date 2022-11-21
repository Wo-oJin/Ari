package ari.paran.config;

import ari.paran.jwt.JwtAccessDeniedHandler;
import ari.paran.jwt.JwtAuthenticationEntryPoint;
import ari.paran.jwt.JwtSecurityConfig;
import ari.paran.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Configuration;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // 메서드 단위로 @PreAuthorize 검증 어노테이션을 사용
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    private final TokenProvider tokenProvider; // jwt 생성 및 유저 정보 반환
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final RedisTemplate redisTemplate;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CSRF 설정 Disable
        http.csrf().disable()

                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 401
                .accessDeniedHandler(jwtAccessDeniedHandler) // 403

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
                .and()
                .authorizeRequests()

                .antMatchers("/auth/logout").hasAnyRole("USER","OWNER", "ADMIN")
                .antMatchers("/member/**").hasAnyRole("USER", "OWNER", "ADMIN")
                .antMatchers("/user/**").hasRole("USER")
                .antMatchers("/owner/**").hasRole("OWNER")
                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/ws/**").permitAll()
//                .antMatchers("/swagger-resources/**").permitAll()
//                .antMatchers("/swagger-ui/**").permitAll()
//                .antMatchers("/v2/**").permitAll()
//                .antMatchers("/swagger/**").permitAll()


                .anyRequest().permitAll()   // 나머지 API 는 전부 인증 필요

                // JwtFilter를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider, redisTemplate));

        return http.build();
    }
}
