package ari.paran.dto.response.store;

import ari.paran.domain.Partnership;
import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter
public class SimpleStoreDto {

    private final List<SimpleStore> storeList;

    public SimpleStoreDto(){
        this.storeList = new ArrayList<SimpleStore>();
    }

    public void addStore(Store store, FileService fileService) throws IOException {
        SimpleStore simpleStore = new SimpleStore();

        simpleStore.setName(store.getName());
        simpleStore.setAddress(store.getAddress());
        simpleStore.setPartnershipList(store.getPartnershipList());
        simpleStore.setImage(fileService.getImage(store));
        simpleStore.setPrivate_event(store.getPrivateevent());
        simpleStore.setStamp(store.getStamp());

        storeList.add(simpleStore);
    }

    @Data
    public class SimpleStore{
        private String name;
        private String address;
        private List<Partnership> partnershipList;
        private String image;
        private boolean private_event;
        private boolean stamp;
    }
}
