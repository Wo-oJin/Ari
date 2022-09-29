package ari.paran.dto.response.board;

import lombok.Builder;
import lombok.Getter;
import java.util.*;
import java.time.LocalDate;

@Getter
public class DetailArticleDto {

    private Long storeId;
    private String title;
    private String author;
    private Long storeId;
    private String location;
    private String content;
    private String period;
    private boolean favorite;
    private boolean authority;
    private LocalDate createDate;
    private LocalDate updateDate;
    private List<String> images;

    @Builder
<<<<<<< HEAD
    public DetailArticleDto(String title, String author, Long storeId, String location, String content, String period, boolean favorite,
=======
    public DetailArticleDto(Long storeId, String title, String author, Long articleId, String location, String content, String period, boolean favorite,
>>>>>>> 7882b637 (Update: DetailArticle 반환 시 StoreId 추가)
                            boolean authority, LocalDate createDate, LocalDate updateDate, List<String> images){

        this.storeId = storeId;
        this.title = title;
        this.author = author;
        this.storeId = storeId;
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
