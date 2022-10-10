package ari.paran.dto.response.board;

import ari.paran.domain.board.ArticleImgFile;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SimpleArticleDto {

    private Long id;
    private String title;
    private String author;
    private String image;
    private LocalDate createDate;
    private boolean isCompleted;

    @Builder
    public SimpleArticleDto(Long id, String title, String author, String image, LocalDate createDate, boolean isCompleted){

        this.id = id;
        this.title = title;
        this.author = author;
        this.image = image;
        this.createDate = createDate;
        this.isCompleted = isCompleted;

    }



}
