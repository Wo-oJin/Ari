package ari.paran.dto.response.board;

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

    @Builder
    public UpdateForm(Long id, String title, String content, String period, LocalDate updateDate){

        this.id = id;
        this.title = title;
        this.content = content;
        this.period = period;
        this.updateDate = updateDate;
    }
}
