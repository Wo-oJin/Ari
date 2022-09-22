package ari.paran.dto.response.chat;

import ari.paran.domain.chat.ChatMessage;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Data
public class RoomDto {
    private String date;
    private List<MessageDto> messages;

    private RoomDto(){};

    public static RoomDto createRoomDto(LocalDate paramDate, List<ChatMessage> messages){
        RoomDto roomDto = new RoomDto();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
        DayOfWeek dayOfWeek = paramDate.getDayOfWeek();

        roomDto.date = paramDate.format(formatter) + " " +dayOfWeek.getDisplayName(TextStyle.FULL, Locale.KOREAN);
        roomDto.messages = messages.stream()
                .map(message -> MessageDto.createMessageDto(message.getSender(), message.getCreateTime(), message.getContent(), message.getType()))
                .collect(Collectors.toList());

        return roomDto;
    }

}
