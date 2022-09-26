package ari.paran.dto.response.store;

import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SimpleStoreDto {

    private Long storeId;
    private String name;
    private Address address;
    private List<String> partnersName;
    private String image;
    private String eventContent;
    private int eventLength;
    private String eventPeriod;
    
    private boolean privateEvent;
    private boolean stamp;

    @Builder
    public SimpleStoreDto(Long storeId, String name, Address address, List<String> partnersNames,
                          String image, String eventContent, int eventLength,
                          String eventPeriod, boolean privateEvent){
        this.storeId = storeId;
        this.name = name;
        this.address = address;
        this.partnersName = partnersNames;
        this.image = image;
        this.eventContent = eventContent;
        this.eventLength = eventLength;
        this.eventPeriod = eventPeriod;
        this.privateEvent = privateEvent;
    }

}
