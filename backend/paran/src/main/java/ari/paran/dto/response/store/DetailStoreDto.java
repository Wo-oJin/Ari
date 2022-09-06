package ari.paran.dto.response.store;

import ari.paran.domain.Event;
import ari.paran.domain.member.Member;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;

@Getter
public class DetailStoreDto {

    private Long id;
    private String name;
    private String ownerName;
    private Address address;
    private String phoneNumber;
    private String openHour;
    private String subText;
    private boolean favorite;
    private List<Store.Partner> partners;
    private List<Event> events;
    private List<String> images;
    private boolean privateEvent;
    private boolean stamp;

    public DetailStoreDto(Store store) throws IOException {

        this.id = store.getId();
        this.name = store.getName();
        this.ownerName = store.getOwnerName();
        this.address = store.getAddress();
        this.openHour = store.getOpenTime();
        this.subText = store.getSubText();
        this.phoneNumber = store.getPhoneNumber();
        this.privateEvent = store.getPrivateEvent();
        this.events = store.getEventList();

        List<Partnership> partners = store.getPartnershipList();

        for(Partnership partner : partners){
            partner.setPartnerLocation(store.getAddress().getRoadAddress());
        }

        this.partners = store.getPartners();
    }

    public void setStoreImages(List<String> images){
        this.images = images;
    }

    public void setFavorite(boolean favorite){
        this.favorite = favorite;
    }

}
