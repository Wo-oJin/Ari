package ari.paran.domain.board;

import ari.paran.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ArticleImgFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    String filename;
    String fileUrl;

    @Builder
    public ArticleImgFile(Article article, String filename, String fileUrl){
        this.article = article;
        this.filename = filename;
        this.fileUrl = fileUrl;
    }

    public void setArticle(Article article){
        this.article = article;
    }

}