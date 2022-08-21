package ari.paran.dto.response.store;

import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
public class SimpleStoreDto {

    private final List<SimpleStore> storeList;

    public SimpleStoreDto(){
        this.storeList = new ArrayList<SimpleStore>();
    }

    public void addStore(Store store, FileService fileService, StoreService storeService) throws IOException {
        SimpleStore simpleStore = new SimpleStore();

        simpleStore.setStore_id(store.getId());
        simpleStore.setName(store.getName());
        simpleStore.setAddress(store.getAddress());
        simpleStore.setPartners_name(storeService.getPartnersName(store.getName()));
        simpleStore.setImage(fileService.getImage(store));
        simpleStore.setPrivate_event(store.getPrivateEvent());
        simpleStore.setStamp(store.getStamp());

        // 가게 주소 // 가게 사진, 가게 이름, 협력 가게 목록, 협력/개인/스탬프 이벤트 진행 여부가 표시된다.

        storeList.add(simpleStore);
    }

    @Getter
    @Setter
    private static class SimpleStore{

        private Long store_id;
        private String name;
        private Address address;
        private List<String> partners_name;
        private List<String> image;
        private boolean private_event;
        private boolean stamp;
    }

}
