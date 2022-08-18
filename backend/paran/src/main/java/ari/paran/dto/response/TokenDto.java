package ari.paran.dto.response;

import ari.paran.domain.Authority;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpireIn;
    private Long refreshTokenExpiresIn;
    private String authority;
    private String info;

    public void setInfo(String info) {
        this.info = info;
    }
}
