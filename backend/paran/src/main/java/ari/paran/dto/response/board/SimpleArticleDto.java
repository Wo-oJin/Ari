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
    private ArticleImgFile image;
    private LocalDate createDate;

    @Builder
    public SimpleArticleDto(Long id, String title, String author, ArticleImgFile image, LocalDate createDate){

        this.id = id;
        this.title = title;
        this.author = author;
        this.image = image;
        this.createDate = createDate;

    }



}
