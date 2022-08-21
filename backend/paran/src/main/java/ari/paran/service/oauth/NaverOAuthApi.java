package ari.paran.service.oauth;

import com.github.scribejava.core.builder.api.DefaultApi20;

public class NaverOAuthApi extends DefaultApi20 {

    protected NaverOAuthApi() {
    }

    private static class InstanceHolder {
        private static final NaverOAuthApi INSTANCE = new NaverOAuthApi();
    }

    public static NaverOAuthApi instance() {
        return InstanceHolder.INSTANCE;
    }

    @Override // 토큰 발급
    public String getRefreshTokenEndpoint() {
        return "https://nid.naver.com/oauth2.0/token";
    }

    @Override // 토큰 발급
    public String getAccessTokenEndpoint() {
        return "https://nid.naver.com/oauth2.0/token";
    }

    @Override // 코드 발급
    protected String getAuthorizationBaseUrl() {
        return "https://nid.naver.com/oauth2.0/authorize";
    }
}
