package ari.paran.domain.chat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class ChatMessage implements Comparable<ChatMessage>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private MessageType type;

    //보내는 사람
    private String sender;
    //내용
    private String content;
    //시간
    private Timestamp createTime;
    private LocalDate createDate;

    @Override
    public int compareTo(ChatMessage o) {
        return (int)(this.getCreateTime().getTime() - o.getCreateTime().getTime());
    }

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
