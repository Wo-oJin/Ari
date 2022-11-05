package ari.paran.dto.response.board.article;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LikeArticleListDto {
    String name;
    Long articleId;
    LocalDate updateDate;
    String image;
    boolean isCompleted;

    @Builder
    public LikeArticleListDto(String name, Long articleId, LocalDate updateDate, String image, boolean isCompleted) {
        this.name = name;
        this.articleId = articleId;
        this.updateDate = updateDate;
        this.image = image;
    }
}
