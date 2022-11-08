package ari.paran.dto.response.board.notice;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SimpleNoticeDto {

    private Long id;
    private String title;
    private String createDate;

    public SimpleNoticeDto(Long id, String title, String createDate){
        this.id = id;
        this.title = title;
        this.createDate = createDate;
    }

}
