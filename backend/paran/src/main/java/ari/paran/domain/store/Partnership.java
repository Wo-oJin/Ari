package ari.paran.domain.store;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partnership_id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_store_id")
    private Store store;
    @Column(name = "to_store_name")
    private String partnerName;
    private transient String partnerLocation;
    private String info; // 제휴 정보
    private LocalDate startDate;
    private LocalDate finishDate;

    @Builder
    private Partnership(Store store, String partnerName, String partnerLocation, String info, LocalDate startDate, LocalDate finishDate){
        this.store = store;
        this.partnerName = partnerName;
        this.partnerLocation = partnerLocation;
        this.info = info;
        this.startDate = startDate;
        this.finishDate = finishDate;
    }

    public void changePartnershipStore(Store store){
        this.store = store;
    }

    // 임시로 사용 --> 기능 구현 시 삭제해야함
    public void setPartnerLocation(String partnerLocation){
        this.partnerLocation = partnerLocation;
    }

}
