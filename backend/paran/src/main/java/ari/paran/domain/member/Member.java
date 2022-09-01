package ari.paran.domain.member;

import ari.paran.domain.board.Article;
import ari.paran.domain.store.Favorite;
import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
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

    @Enumerated(EnumType.STRING) // enum 이름을 DB에 저장
    private Authority authority;

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Store> stores = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Favorite> favorites = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Article> articles = new ArrayList<>();

    @Builder
    public Member(String email, String password, String nickname, String gender, int age, Authority authority) {
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.authority = authority;
    }

    public void addStore(Store store){
        this.stores.add(store);
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
        return this.favorites.stream()
                .map(Favorite :: getStore)
                .map(Store :: getId)
                .collect(Collectors.toList());
    }

    public void addFavorite(Favorite favorite) {
        this.favorites.add(favorite);
    }
}