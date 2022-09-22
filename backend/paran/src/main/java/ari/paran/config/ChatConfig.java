package ari.paran.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket 서버를 활성화
public class ChatConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // 웹소켓 서버의 엔드포인트
                .setAllowedOriginPatterns("*") // cors 오류 방지(지금은 모든 origin 허용)
                .withSockJS();
    }

    // 한 클라이언트에서 다른 클라이언트로 메시지를 라우팅 하는 데 사용될 메시지 브로커를 구성
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        //app이 붙은 메시지들은 @MessageMapping이 붙은 method로 바운드된다.
        registry.setApplicationDestinationPrefixes("/app");

        // queue, topic으로 시작되는 메시지가 메시지 브로커로 라우팅 되도록 정의
        // 메시지 브로커는 특정 주제를 구독 한 연결된 모든 클라이언트에게 메시지를 broadcast
        registry.enableSimpleBroker("/topic");
    }
}
