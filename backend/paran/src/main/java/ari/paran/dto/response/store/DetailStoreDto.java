package ari.paran.dto.response.store;

import ari.paran.domain.Event;
import ari.paran.domain.member.Member;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
public class DetailStoreDto {

    public DetailStore getStore(Store store, FileService fileService, Member member) throws IOException {
        DetailStore detailStore = new DetailStore();

        detailStore.setId(store.getId());
        detailStore.setName(store.getName());
        detailStore.setOwnerName(store.getOwnerName());
        detailStore.setAddress(store.getAddress());
        detailStore.setOpenHour(store.getOpenTime());
        detailStore.setSubText(store.getSubText());
        detailStore.setFavoriteList(member.getFavoriteStoreId());
        detailStore.setPhoneNumber(store.getPhoneNumber());
        detailStore.setImage(fileService.getImage(store));
        detailStore.setPrivateEvent(store.getPrivateEvent());
        detailStore.setStamp(store.getStamp());
        detailStore.setEvents(store.getEventList());

        List<Partnership> partners = store.getPartnershipList();

        for(Partnership partner : partners){
            partner.setPartnerLocation(store.getAddress().getRoadAddress());
        }
        detailStore.setPartners(store.getPartners());

        return detailStore;
    }

    @Getter
    @Setter
    private static class DetailStore{

        private Long id;
        private String name;
        private String ownerName;
        private Address address;
        private String phoneNumber;
        private String openHour;
        private String subText;
        private List<Long> favoriteList;
        private List<Store.Partner> partners;
        private List<Event> events;
        private List<String> image;
        private boolean privateEvent;
        private boolean stamp;

    }

}
