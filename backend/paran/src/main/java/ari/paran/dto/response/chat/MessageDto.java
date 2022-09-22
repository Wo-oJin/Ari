package ari.paran.dto.response.chat;

import ari.paran.domain.chat.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageDto {

    private String sender;
    private String createTime;

    private String content;

    private ChatMessage.MessageType type;

    private MessageDto(){}

    public static MessageDto createMessageDto(String sender, Timestamp createTime,
                                              String content, ChatMessage.MessageType type){

        MessageDto messageDto = new MessageDto();

        LocalDateTime time  = createTime.toLocalDateTime().minusHours(9);

        int hour = time.getHour();
        System.out.println("hour = " + createTime.toString()+" "+hour);
        String minute = String.valueOf(time.getMinute());

        StringBuilder stringBuilder = new StringBuilder();

        if(hour>12)
            stringBuilder.append("오후 "+String.valueOf(hour-12)+"시 "+minute+"분");
        else
            stringBuilder.append("오전 "+String.valueOf(hour)+"시 "+minute+"분");

        messageDto.createTime = stringBuilder.toString();
        messageDto.sender = sender;
        messageDto.setContent(content);
        messageDto.setType(type);

        return messageDto;
    }
}
