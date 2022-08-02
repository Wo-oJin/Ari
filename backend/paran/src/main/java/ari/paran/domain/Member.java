package ari.paran.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "member")
@Entity
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String nickname;
    private String gender;

    private boolean fromOauth = false;

    public void setFromOauth() {
        this.fromOauth = true;
    }

    @Enumerated(EnumType.STRING) // enum 이름을 DB에 저장
    private Authority authority;

    @Builder
    public Member(String username, String email, String password, String nickname, String gender, Authority authority) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.authority = authority;
        this.nickname = nickname;
        this.gender = gender;
        this.fromOauth = false;
    }
}