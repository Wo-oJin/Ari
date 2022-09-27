package ari.paran.domain.store;

import ari.paran.domain.board.Article;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partnershipId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    private String StoreName;
    private Long partnerId;
    private String partnerName;
    private Long counterpartId;
    private String partnerLocation;
    private String info; // 제휴 정보
    private LocalDate startDate;
    private LocalDate finishDate;
    @OneToOne
    @JoinColumn(name = "article_id")
    private Article article;
    @Enumerated(EnumType.STRING)
    private PartnershipState partnershipState;
    private boolean isFrom;
    private boolean isFinish;
    @ColumnDefault("0")
    private boolean isRead;


    @Builder
    private Partnership(Store store, String StoreName, Long partnerId, String partnerName, String partnerLocation,
                        String info, LocalDate startDate, LocalDate finishDate, PartnershipState partnershipState,
                        Long counterpartId, Article article, boolean isFrom){
        this.store = store;
        this.StoreName = StoreName;
        this.partnerId = partnerId;
        this.partnerName = partnerName;
        this.partnerLocation = partnerLocation;
        this.info = info;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.partnershipState = partnershipState;
        this.counterpartId = counterpartId;
        this.article = article;
        this.isFrom = isFrom;
    }



    // 임시로 사용 --> 기능 구현 시 삭제해야함
    public void setPartnerLocation(String partnerLocation){
        this.partnerLocation = partnerLocation;
    }

    public void changeReadStatus() {
        isRead = true;
    }

    public void setCounterpartId(Long counterpartId) {
        this.counterpartId = counterpartId;
    }

    /**
     * 제휴 상태 변경 메소드
     */
    public void changePartnershipState(PartnershipState partnershipState) {
        this.partnershipState = partnershipState;
    }
}
