package ari.paran.domain;

import ari.paran.domain.store.Favorite;
import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@Table(name = "member")
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
    @OneToMany(mappedBy = "member")
    private List<Store> stores = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Favorite> favorites = new ArrayList<>();

    @Builder
    public Member(String username, String email, String password, String nickname, String gender, int age, Authority authority) {
        this.email = email;
        this.password = password;
        this.authority = authority;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
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
}