package ari.paran.domain;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
public class SignupCode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String code;
    @ColumnDefault("0")
    private boolean activated;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void setActivatedTrue() {

        this.activated = true;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}

