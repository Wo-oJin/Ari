package ari.paran.dto.response.store;

import ari.paran.domain.Event;
import ari.paran.domain.Partnership;
import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import lombok.Data;
import lombok.Getter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
public class DetailStoreDto {

    private final List<DetailStore> storeList;

    public DetailStoreDto(){
        this.storeList = new ArrayList<DetailStore>();
    }

    public void addStore(Store store, FileService fileService) throws IOException {
        DetailStore detailStore = new DetailStore();

        detailStore.setId(store.getId());
        detailStore.setName(store.getName());
        detailStore.setOwnerName(store.getOwnerName());
        detailStore.setAddress(store.getAddress());
        detailStore.setOpenHour(store.getOpenTime());
        detailStore.setSubText(store.getSubText());
        detailStore.setPhoneNumber(store.getPhoneNumber());
        detailStore.setImage(fileService.getImage(store));
        detailStore.setPrivateEvent(store.getPrivateEvent());
        detailStore.setStamp(store.getStamp());

        List<Partnership> partners = store.getPartnershipList();

        for(Partnership partner : partners){
            partner.setPartnerLocation(store.getAddress().getRoadAddress());
        }

        detailStore.setPartners(store.getPartners());
        detailStore.setEvents(store.getEventList());

        storeList.add(detailStore);
    }

    public DetailStoreDto.DetailStore makeDetailStoreDto(Store store, FileService fileService) throws  IOException{
        DetailStore detailStore = new DetailStore();

        detailStore.setId(store.getId());
        detailStore.setName(store.getName());
        detailStore.setOwnerName(store.getOwnerName());
        detailStore.setAddress(store.getAddress());
        detailStore.setOpenHour(store.getOpenTime());
        detailStore.setSubText(store.getSubText());
        detailStore.setPhoneNumber(store.getPhoneNumber());
        detailStore.setImage(fileService.getImage(store));
        detailStore.setPrivateEvent(store.getPrivateEvent());
        detailStore.setStamp(store.getStamp());

        return detailStore;
    }

    @Data
    private static class DetailStore{

        private Long id;
        private String name;
        private String ownerName;
        private Address address;
        private String phoneNumber;
        private String openHour;
        private String subText;
        private List<Store.Partner> partners;
        private List<Event> events;
        private List<String> image;
        private boolean privateEvent;
        private boolean stamp;

        public Store toStore() {
            return Store.builder()
                    .name(getName())
                    .address(getAddress())
                    .ownerName(getOwnerName())
                    .phoneNumber(getPhoneNumber())
                    .subText(getSubText())
                    .openTime(getOpenHour())
                    .build();
        }

    }

}
