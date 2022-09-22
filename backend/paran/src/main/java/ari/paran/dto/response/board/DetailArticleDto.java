package ari.paran.dto.response.board;

import lombok.Builder;
import lombok.Getter;
import java.util.*;
import java.time.LocalDate;

@Getter
public class DetailArticleDto {

    private String title;
    private String author;
    private Long articleId;
    private String location;
    private String content;
    private String period;
    private boolean favorite;
    private boolean authority;
    private LocalDate createDate;
    private LocalDate updateDate;
    private List<String> images;

    @Builder
    public DetailArticleDto(String title, String author, Long articleId, String location, String content, String period, boolean favorite,
                            boolean authority, LocalDate createDate, LocalDate updateDate, List<String> images){

        this.title = title;
        this.author = author;
        this.articleId = articleId;
        this.location = location;
        this.content = content;
        this.period = period;
        this.favorite = favorite;
        this.authority = authority;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.images = images;
    }

}
