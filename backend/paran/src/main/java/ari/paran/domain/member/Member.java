package ari.paran.domain.member;

import ari.paran.domain.board.Article;
import ari.paran.domain.board.FavoriteArticle;
import ari.paran.domain.store.FavoriteStore;
import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Slf4j
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String password;
    private String email;
    private String nickname;
    private String gender;
    private int age;
    private int fromOauth;

    @Enumerated(EnumType.STRING) // enum 이름을 DB에 저장
    private Authority authority;

    @JsonIgnore
    @OneToMany(mappedBy = "member", orphanRemoval = true)
    private List<Store> stores = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FavoriteStore> favoriteStores = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FavoriteArticle> favoriteArticles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Article> articles = new ArrayList<>();

    @Builder
    public Member(String email, String password, String nickname, String gender,
                  int age, int fromOauth, Authority authority) {
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.fromOauth = fromOauth;
        this.authority = authority;
    }

    public void addStore(Store store){
        stores.add(store);
        store.setMember(this);
    }

    public void addArticle(Article article){
        this.articles.add(article);
        article.setMember(this);
    }

    public void changeRole(Authority authority) {
        this.authority = authority;
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }

    // 비즈니스 메서드
    public List<Long> getFavoriteStoreId(){
        return this.favoriteStores.stream()
                .map(FavoriteStore :: getStore)
                .map(Store :: getId)
                .collect(Collectors.toList());
    }

    public boolean isFavoriteStore(Store store){
        return favoriteStores.stream().map(FavoriteStore :: getStore)
                .anyMatch(findStore->  findStore.getId() == store.getId());
    }

    public boolean isFavoriteArticle(Article article){
        return favoriteArticles.stream().map(FavoriteArticle :: getArticle)
                .anyMatch(findArticle->  findArticle.getId() == article.getId());
    }

    public List<String> getStoresName(){
        return stores.stream()
                .map(Store :: getName)
                .collect(Collectors.toList());
    }

    public void addFavorite(FavoriteStore favorite) {
        this.favoriteStores.add(favorite);
    }

    public void addFavoriteArticle(FavoriteArticle article) {
        this.favoriteArticles.add(article);
    }

    public void deleteFavorite(FavoriteStore favorite){
        this.favoriteStores.remove(favorite);
    }

    public void deleteFavoriteArticle(FavoriteArticle article) {
        this.favoriteArticles.remove(article);
    }
}