package ari.paran.auth;

import com.github.scribejava.core.builder.api.DefaultApi20;

public class KakaoOAuthApi extends DefaultApi20 {

    protected KakaoOAuthApi() {
    }

    private static class InstanceHolder {
        private static final KakaoOAuthApi INSTANCE = new KakaoOAuthApi();
    }

    public static KakaoOAuthApi instance() {
        return InstanceHolder.INSTANCE;
    }

    @Override // 토큰 발급
    public String getRefreshTokenEndpoint() {
        return "https://kauth.kakao.com/oauth/token";
    }

    @Override // 토큰 발급
    public String getAccessTokenEndpoint() {
        return "https://kauth.kakao.com/oauth/token";
    }

    @Override // 코드 발급
    protected String getAuthorizationBaseUrl() {
        return "https://kauth.kakao.com/oauth/authorize";
    }
}
