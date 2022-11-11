package ari.paran.dto.response.store;

import ari.paran.domain.Event;
import ari.paran.domain.store.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Getter
public class DetailStoreDto {

    private Long id;
    private String name;
    private Long ownerId;
    private String ownerName;
    private Address address;
    private String storePhoneNumber;
    private String openTime;
    private String subText;
    private boolean favorite;
    private List<Partner> partners;
    private List<Event> events;
    private List<String> images;
    private boolean privateEvent;
    private boolean result;

    public DetailStoreDto(boolean result) {
        this.result = result;
    }

    @Builder
    public DetailStoreDto(Long storeId, String storeName, Long ownerId, String ownerName, Address address,
                          String openTime, String subText, String storePhoneNumber,
                          boolean doPrivateEvent, List<Event> eventList, List<Partner> partners,
                          List<String> images, boolean isFavorite, boolean result) throws IOException {

        this.id = storeId;
        this.name = storeName;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.address = address;
        this.openTime = openTime;
        this.subText = subText;
        this.storePhoneNumber = storePhoneNumber;
        this.privateEvent = doPrivateEvent;
        this.events = eventList;
        this.partners = partners;
        this.images = images;
        this.favorite = isFavorite;
        this.result = result;
    }

    /***************************************************************
     * 협약 가게의 이름, 도로명 주소, 협약 내용을 담고 있는 DTO라 생각해도 된다.
     * FE에서 요구하는 데이터만 추출하기 위해 만들었음.
     ***************************************************************/
    @Getter
    @AllArgsConstructor
    public static class Partner{
        private String partnerName;
        private String roadAddress;
        private List<DetailStoreDto.EventInfo> infos;
    }

    /***************************************************************
     * 1개의 이벤트 정보와 시작/종료 날짜를 담는 DTO라 생각해도 된다.
     * FE에서 요구하는 데이터만 추출하기 위해 만들었음.
     ***************************************************************/
    @Getter
    @AllArgsConstructor
    public static class EventInfo{
        private String eventInfo;
        private LocalDate startDate;
        private LocalDate finishDate;

    }

}
