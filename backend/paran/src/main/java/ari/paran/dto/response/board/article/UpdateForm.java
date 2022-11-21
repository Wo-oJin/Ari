package ari.paran.dto.response.board.article;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateForm {

    private Long id;
    private String title;
    private String content;
    private String period;
    private LocalDate updateDate;
    private String contact;

    @Builder
    public UpdateForm(Long id, String title, String content, String period, LocalDate updateDate, String contact){

        this.id = id;
        this.title = title;
        this.content = content;
        this.period = period;
        this.updateDate = updateDate;
        this.contact = contact;
    }
}
