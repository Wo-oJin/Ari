package ari.paran.dto.response.store;

import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SimpleStoreDto {

    private Long storeId;
    private String storeName;
    private Address address;
    private List<String> partnersName;
    private String storeImage;
    private String eventContent;
    private int eventLength;
    private String eventPeriod;
    
    private boolean privateEvent;

    @Builder
    public SimpleStoreDto(Long storeId, String storeName, Address address, List<String> partnersNames,
                          String storeImage, String eventContent, int eventLength,
                          String eventPeriod, boolean privateEvent){
        this.storeId = storeId;
        this.storeName = storeName;
        this.address = address;
        this.partnersName = partnersNames;
        this.storeImage = storeImage;
        this.eventContent = eventContent;
        this.eventLength = eventLength;
        this.eventPeriod = eventPeriod;
        this.privateEvent = privateEvent;
    }

}
