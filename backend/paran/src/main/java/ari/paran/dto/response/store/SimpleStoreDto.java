package ari.paran.dto.response.store;

import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
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

        simpleStore.setStoreId(store.getId());
        simpleStore.setName(store.getName());
        simpleStore.setAddress(store.getAddress());
        simpleStore.setPartnersName(storeService.getPartnersName(store.getName()));
        simpleStore.setImage(fileService.getImage(store));
        simpleStore.setPrivateEvent(store.getPrivateEvent());
        simpleStore.setStamp(store.getStamp());

        storeList.add(simpleStore);
    }

    @Getter
    @Setter
    private static class SimpleStore{

        private Long storeId;
        private String name;
        private Address address;
        private List<String> partnersName;
        private List<String> image;
        private boolean privateEvent;
        private boolean stamp;
    }

}
