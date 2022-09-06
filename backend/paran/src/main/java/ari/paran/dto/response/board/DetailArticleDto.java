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
    private Long storeId;
    private String content;
    private String period;
    private boolean favorite;
    private LocalDate createDate;
    private LocalDate updateDate;
    private List<String> images;

    @Builder
    public DetailArticleDto(String title, String author, Long storeId, String content, String period, boolean favorite,
                            LocalDate createDate, LocalDate updateDate, List<String> images){

        this.title = title;
        this.author = author;
        this.storeId = storeId;
        this.content = content;
        this.period = period;
        this.favorite = favorite;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.images = images;
    }

}
