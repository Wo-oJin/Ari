package ari.paran.dto.response.board.notice;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SimpleNoticeDto {

    private String title;
    private String createDate;

    public SimpleNoticeDto(String title, String createDate){
        this.title = title;
        this.createDate = createDate;
    }

}
