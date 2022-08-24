package ari.paran.dto.response.board;

import ari.paran.domain.board.Article;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.*;

@Getter
public class ArticleListDto {

    Page<Article> articleList;

    private int now;
    private int start;
    private int end;

    @Builder
    public ArticleListDto(Page<Article> articleList, int now, int start, int end){
        this.articleList = articleList;
        this.now = now;
        this.start = start;
        this.end = end;
    }


}
