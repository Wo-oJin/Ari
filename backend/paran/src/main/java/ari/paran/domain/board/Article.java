package ari.paran.domain.board;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.FavoriteStore;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Table(name = "board")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Article {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String author;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member member;

    @Setter
    @Column(name = "create_date")
    private LocalDate createDate;

    @Setter
    @Column(name = "update_date")
    private LocalDate updateDate;

    @Column(name = "partnership_period")
    private String period;

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleImgFile> imgFiles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<FavoriteArticle> favorites = new ArrayList<>();

    @Column(name = "is_completed")
    @ColumnDefault("false")
    private boolean isCompleted;

    @Builder
    public Article(String title, String content, Member member, String author,
                   LocalDate createDate, LocalDate updateDate, String period){
        this.title = title;
        this.content = content;
        this.member = member;
        this.author = author;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.period = period;
    }

    public void setMember(Member member){
        this.member = member;
    }

    // for test
    public void changeTitle(String title){
        this.title = title;
    }
    public void changeContent(String content){this.content = content;}
    public void changePeriod(String period){this.period = period;}
    public void changeImages(List<ArticleImgFile> imgFiles){this.imgFiles = imgFiles;}

    public void addImgFile(ArticleImgFile articleImgFile){
        this.imgFiles.add(articleImgFile);
        articleImgFile.setArticle(this);
    }

    public void addFavorite(FavoriteArticle favorite) {
        this.favorites.add(favorite);
    }

}
