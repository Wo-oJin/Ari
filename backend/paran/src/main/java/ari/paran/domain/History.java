package ari.paran.domain;

import ari.paran.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    private String visitTime;

    @Column
    private String storeName;

    @Column
    private String eventInfo;

    public History(Member member, String storeName, String eventInfo) {
        this.member = member;
        this.storeName = storeName;
        this.eventInfo = eventInfo;
    }

    public History(Member member, String visitTime, String storeName, String eventInfo) {
        this.member = member;
        this.visitTime = visitTime;
        this.storeName = storeName;
        this.eventInfo = eventInfo;
    }
}
