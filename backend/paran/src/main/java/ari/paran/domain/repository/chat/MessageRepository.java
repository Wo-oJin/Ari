package ari.paran.domain.repository.chat;

import ari.paran.domain.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<ChatMessage, Long> {
}
