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

    private final List<DetailStore> storeList;

    public DetailStoreDto(){
        this.storeList = new ArrayList<DetailStore>();
    }

    public void addStore(Store store, FileService fileService, Member member) throws IOException {
        DetailStore detailStore = new DetailStore();

        detailStore.setId(store.getId());
        detailStore.setName(store.getName());
        detailStore.setOwner_name(store.getOwnerName());
        detailStore.setAddress(store.getAddress());
        detailStore.setOpen_hour(store.getOpenTime());
        detailStore.setSub_text(store.getSubText());
        detailStore.setFavoriteList(member.getFavoriteStoreId());
        detailStore.setPhoneNumber(store.getPhoneNumber());
        detailStore.setImage(fileService.getImage(store));
        detailStore.setPrivate_event(store.getPrivateEvent());
        detailStore.setStamp(store.getStamp());

        List<Partnership> partners = store.getPartnershipList();

        for(Partnership partner : partners){
            partner.setPartnerLocation(store.getAddress().getRoadAddress());
        }

        detailStore.setPartners(store.getPartners());
        detailStore.setEvents(store.getEventList());

        storeList.add(detailStore);
    }

    @Getter
    @Setter
    private static class DetailStore{

        private Long id;
        private String name;
        private String owner_name;
        private Address address;
        private String phoneNumber;
        private String open_hour;
        private String sub_text;
        private List<Long> favoriteList;
        private List<Store.Partner> partners;
        private List<Event> events;
        private List<String> image;
        private boolean private_event;
        private boolean stamp;
    }

}
