package ari.paran.service.chat;

import ari.paran.domain.chat.ChatMessage;
import ari.paran.domain.repository.chat.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final MessageRepository messageRepository;

    public List<ChatMessage> getMessages(){
        return messageRepository.findAll();
    }

    // 채팅이 모여져있는 messages를 날짜별->오름차순으로 분류
    public Map<LocalDate, List<ChatMessage>> getMessageGroups(){
        List<ChatMessage> messages = messageRepository.findAll();
        TreeMap<LocalDate, List<ChatMessage>> groups = new TreeMap<>();
        List<ChatMessage> chatting;

        for(ChatMessage message : messages){
            List<ChatMessage> group = groups.get(message.getCreateDate());
            LocalDate date = message.getCreateDate();

            if(group == null)
                chatting = new ArrayList<>();
            else
                chatting = groups.get(message.getCreateDate());

            chatting.add(message);
            groups.put(date, chatting);
        }

        Set<LocalDate> keys = groups.keySet();
        for(LocalDate key : keys){
            chatting = groups.get(key);
            Collections.sort(chatting);
            groups.put(key, chatting);
        }

        return groups;
    }

    @Transactional
    public void saveMessage(ChatMessage message) {
        message.setCreateDate(LocalDate.now());
        message.setCreateTime(Timestamp.valueOf(LocalDateTime.now().plusHours(9)));

        messageRepository.save(message);
    }
}
