package ari.paran.dto.response.board.notice;

import ari.paran.domain.board.Notice;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DetailNoticeDto {

    @NotNull
    private String title;
    @NotNull
    private String content;

    private String createDate;

    public DetailNoticeDto(String title, String content, String createDate){
        this.title = title;
        this.content = content;
        this.createDate = createDate;
    }

    public Notice toNotice(){
        return Notice.builder()
                .title(title)
                .content(content)
                .build();
    }

}
