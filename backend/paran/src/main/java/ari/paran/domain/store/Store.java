package ari.paran.domain.store;

import ari.paran.domain.Event;
import ari.paran.domain.Member;
import ari.paran.domain.Partnership;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Store implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "store_name")
    private String name;

    @Column
    private String ownerName;

    @Embedded
    @Column
    private Address address;

    @Column(name = "phone")
    private String phoneNumber;

    @JsonManagedReference
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<ImgFile> imgFile = new ArrayList<>();

    @Column(name = "open_time")
    private String openTime;

    @Column(name = "sub_text")
    private String subText;

    @ColumnDefault("0")
    @Column
    private boolean privateEvent;

    @ColumnDefault("0")
    @Column
    private boolean stamp;

    @Builder
    public Store(String name, String ownerName, Address address, String phoneNumber, Member member) {
        this.name = name;
        this.ownerName = ownerName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.member = member;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Partnership> partnershipList;

    @JsonManagedReference
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Event> eventList;

    public boolean getPrivateEvent(){
        return this.privateEvent;
    }

    public boolean getStamp(){
        return this.stamp;
    }


    // 비즈니스 로직
    public List<Partner> getPartners(){

        List<Partner> partners = new ArrayList<>();
        MultiValueMap<String, EventInfo> partners_info = new LinkedMultiValueMap<>();

        for(Partnership partnership : partnershipList){
            String partnerName = partnership.getPartnerName();
            String info = partnership.getInfo();
            LocalDate startDate = partnership.getStart_date();
            LocalDate finishDate = partnership.getFinish_date();

            partners_info.add(partnerName, new EventInfo(info, startDate, finishDate));
        }

        Set<String> keys = partners_info.keySet();
        for(String key : keys){
            Partner partner = new Partner(key, address.getRoadAddress(), partners_info.get(key));
            partners.add(partner);
        }

        return partners;
    }

    @Getter
    @AllArgsConstructor
    public class EventInfo{
        private String eventInfo;
        private LocalDate startDate;
        private LocalDate finishDate;

    }

    @Getter
    @AllArgsConstructor
    public class Partner{
        private String partnerName;
        private String roadAddress;
        private List<EventInfo> infos = new ArrayList<>();
    }

}
