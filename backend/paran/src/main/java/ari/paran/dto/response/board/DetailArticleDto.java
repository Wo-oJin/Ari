package ari.paran.dto.response.board;

import ari.paran.domain.board.ArticleImgFile;
import lombok.Builder;
import lombok.Getter;
import java.util.*;
import java.time.LocalDate;

@Getter
public class DetailArticleDto {

    private String title;
    private String author;
    private String content;
    private String period;
    private LocalDate createDate;
    private LocalDate updateDate;
    private List<ArticleImgFile> images;

    @Builder
    public DetailArticleDto(String title, String author, String content, String period,
                            LocalDate createDate, LocalDate updateDate, List<ArticleImgFile> images){

        this.title = title;
        this.author = author;
        this.content = content;
        this.period = period;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.images = images;
    }

}
