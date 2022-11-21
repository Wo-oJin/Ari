package ari.paran.dto.response.board.article;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import java.util.*;
import java.time.LocalDate;

@Getter
public class DetailArticleDto {

    @ApiModelProperty(value = "글쓴이 가게 id")
    private Long storeId;
    private String title;
    private String author;
    private Long articleId;
    private String location;
    private String content;
    private String period;
    private String contact;
    private boolean favorite;
    private boolean authority;
    private LocalDate createDate;
    private LocalDate updateDate;
    private List<String> images;

    @Builder
    public DetailArticleDto(Long storeId, String title, String author, Long articleId, String location, String content, String period, String contact, boolean favorite,
                            boolean authority, LocalDate createDate, LocalDate updateDate, List<String> images){

        this.storeId = storeId;
        this.title = title;
        this.author = author;
        this.articleId = articleId;
        this.location = location;
        this.content = content;
        this.period = period;
        this.contact = contact;
        this.favorite = favorite;
        this.authority = authority;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.images = images;
    }

}
