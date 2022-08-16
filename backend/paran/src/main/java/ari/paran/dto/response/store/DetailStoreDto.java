package ari.paran.dto.response.store;

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

        detailStore.setName(store.getName());
        detailStore.setAddress(store.getAddress());
        detailStore.setImage(fileService.getImage(store));
        detailStore.setPrivate_event(store.getPrivateEvent());
        detailStore.setStamp(store.getStamp());

        List<Partnership> partners = store.getPartnershipList();

        for(Partnership partner : partners){
            partner.setPartnerLocation(store.getAddress().getRoadAddress());
        }

        detailStore.setPartnershipList(store.getPartnershipList());

        storeList.add(detailStore);
    }

    @Data
    public class DetailStore{
        private String name;
        private Address address;
        private List<Partnership> partnershipList;
        private String image;
        private boolean private_event;
        private boolean stamp;
    }

}
