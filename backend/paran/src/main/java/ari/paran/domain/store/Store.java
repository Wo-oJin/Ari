package ari.paran.domain.store;

import ari.paran.domain.Event;
import ari.paran.domain.member.Member;
import ari.paran.dto.response.store.DetailStoreDto;
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
@NoArgsConstructor
@Entity
@ToString
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

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column
    @ColumnDefault("0")
    @JoinColumn(name = "private_event")
    private boolean privateEvent;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<StoreImgFile> storeImgFiles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Partnership> partnershipList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> eventList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<FavoriteStore> favorites = new ArrayList<>();

    @Builder
    public Store(String name, String ownerName, Address address, String phoneNumber, Member member, List<StoreImgFile> storeImgFile,
                 Category category, String subText, String openTime) {

        this.name = name;
        this.ownerName = ownerName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.member = member;
        this.storeImgFiles = storeImgFile;
        this.category = category;
        this.subText = subText;
        this.openTime = openTime;

    }

    public boolean doPrivateEvent(){
        return this.privateEvent;
    }

    public void setMember(Member member){
        this.member = member;
    }

    public void addFavorite(FavoriteStore favorite) {
        this.favorites.add(favorite);
    }

    // 비즈니스 로직

    public void updateInfo(String name, Address address, String ownerName, String phoneNumber, String subText, String openTime) {
        this.name = name;
        this.address = address;
        this.ownerName = ownerName;
        this.phoneNumber = phoneNumber;
        this.subText = subText;
        this.openTime = openTime;
    }

    /***************************************************************
     * 2자리의 가게 카테고리 코드를 전달받은 후, 랜덤한 값 4자리를 더 붙여 총 6자리로 구성된 가게 분류 코드를 전달
     * 가게 분류 코드는 카테코리별 가게 리스트를 가져오기 위해 만든 것임.
     ***************************************************************/
    public String makeCategory(String code){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(code)
                .append(makeNumberFormat(name.hashCode()%100))
                .append(makeNumberFormat(ownerName.hashCode()%100));

        return stringBuilder.toString();
    }

    /***************************************************************
     * makeCategory 메서드에서, 추출한 hash 값을 적절한 string format으로 바꾸기 위해 사용
     ***************************************************************/
    public String makeNumberFormat(int num){
        return num < 10 ? "0" + String.valueOf(num) : String.valueOf(num);
    }

    /***************************************************************
     * 카테고리별 나눠지는 가게 페이지에서 사용될, 간단한 가게 정보를 보내줄 때 사용되는 메서드
     * 해당 가게의 협약/개인 이벤트 정보를 모두 담은 map을 반환함
     * key: 이벤트 내용, value: 이벤트 기간임.
     * 이 map을 이용해 랜덤한 1개 이벤트의 내용, 기간을 추출할 수 있고 해당 가게가 가진 모든 이벤트 개수를 알 수 있음.
     ***************************************************************/
    public Map<String, String> getRandomEvents(){
        Map<String, String> events = new HashMap<>();

        // 가게 이벤트가 사이트에 포함되지 않을 조건
        // 조건 1. 제휴 이벤트의 만료 날짜가 지남
        // 조건 2. 제휴 이벤트의 상태가 상호 승인이 아님
        for(Partnership partnership : partnershipList){
            if(partnership.getFinishDate().isBefore(LocalDate.now()) ||
                    partnership.getPartnershipState() != PartnershipState.APPROVED)
                continue;

            String eventInfo = partnership.getInfo();
            String date = partnership.getStartDate() + " ~ " + partnership.getFinishDate();
            events.put(eventInfo, date);
        }

        for(Event event : eventList) {
            /*
            if(event.getFinishDate().isBefore(LocalDate.now()))
                continue;
             */

            String eventInfo = event.getInfo();
            //String date = event.getStartDate() + " ~ " + event.getFinishDate();
            events.put(eventInfo, null);
        }

        return events;
    }

    public void addImgFile(StoreImgFile storeImgFile){
        this.storeImgFiles.add(storeImgFile);
    }

    public void changeEventStatus(boolean status) {
        this.privateEvent = status;
    }

    public String getFullAddress(){
        return address.getRoadAddress() + " " + address.getDetailAddress();
    }

}
