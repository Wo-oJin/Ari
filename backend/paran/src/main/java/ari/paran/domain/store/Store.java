package ari.paran.domain.store;

import ari.paran.domain.Event;
import ari.paran.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Store implements Serializable{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @Column(name = "store_name")
    private String name;

    @Column
    private String ownerName;

    @Embedded
    @Column
    private Address address;

    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "open_time")
    private String openTime;

    @Column(name = "sub_text")
    private String subText;

    @Column
    @ColumnDefault("0")
    @JoinColumn(name = "private_event")
    private boolean privateEvent;

    @Column
    @ColumnDefault("0")
    private boolean stamp;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<StoreImgFile> storeImgFiles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Partnership> partnershipList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Event> eventList = new ArrayList<>();

    @Builder
    public Store(String name, String ownerName, Address address, String phoneNumber, Member member, List<StoreImgFile> storeImgFile,
                 String subText, String openTime) {
        this.name = name;
        this.ownerName = ownerName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.member = member;
        this.storeImgFiles = storeImgFile;
        this.subText = subText;
        this.openTime = openTime;
    }

    public boolean getPrivateEvent(){
        return this.privateEvent;
    }

    public boolean getStamp(){
        return this.stamp;
    }

    public void setMember(Member member){
        this.member = member;
    }

    // 비즈니스 로직
    public List<Partner> getPartners(){

        List<Partner> partners = new ArrayList<>();
        MultiValueMap<String, EventInfo> partnersInfo = new LinkedMultiValueMap<>();

        for(Partnership partnership : partnershipList){
            String partnerName = partnership.getPartnerName();
            String info = partnership.getInfo();
            LocalDate startDate = partnership.getStartDate();
            LocalDate finishDate = partnership.getFinishDate();

            partnersInfo.add(partnerName, new EventInfo(info, startDate, finishDate));
        }

        Set<String> keys = partnersInfo.keySet();
        for(String key : keys){
            Partner partner = new Partner(key, address.getRoadAddress(), partnersInfo.get(key));
            partners.add(partner);
        }

        return partners;
    }

    @Getter
    @AllArgsConstructor
    public static class Partner{
        private String partnerName;
        private String roadAddress;
        private List<EventInfo> infos;
    }

    @Getter
    @AllArgsConstructor
    private static class EventInfo{
        private String eventInfo;
        private LocalDate startDate;
        private LocalDate finishDate;

    }

    public void addImgFile(StoreImgFile storeImgFile){
        this.storeImgFiles.add(storeImgFile);
    }

    public void addPartnership(Partnership partnership){
        this.partnershipList.add(partnership);
    }

    public void addEvent(Event event){
        this.eventList.add(event);
    }

}
