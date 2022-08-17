package ari.paran.dto.response.store;

import ari.paran.domain.Partnership;
import ari.paran.domain.Store;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SimpleStoreDto {

    private List<SimpleStore> storeList;

    public SimpleStoreDto(){
        this.storeList = new ArrayList<SimpleStore>();
    }

    public void addStore(Store store){
        SimpleStore simpleStore = new SimpleStore();

        simpleStore.setName(store.getName());
        simpleStore.setRoadAddress(store.getRoadAddress());
        simpleStore.setDetailAddress(store.getDetailAddress());
        simpleStore.setPartnershipList(store.getPartnershipList());
        simpleStore.setPrivate_event(store.getPrivateEvent());
        simpleStore.setStamp(store.getStamp());

        storeList.add(simpleStore);
    }

    @Data
    public class SimpleStore{
        private String name;
        private String roadAddress;
        private String detailAddress;
        private List<Partnership> partnershipList;
        private boolean private_event;
        private boolean stamp;
    }
}
