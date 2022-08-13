package ari.paran.controller;

import ari.paran.domain.Store;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.dto.response.store.SimpleStoreDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/map")
public class StoreController {

    private final StoreRepository storeRepository;

    @GetMapping("/store")
    public List<SimpleStoreDto.SimpleStore> storeList(){
        SimpleStoreDto simpleStoreDto = new SimpleStoreDto();
        List<Store> storeList = storeRepository.findAll();

        for(Store store : storeList){
            simpleStoreDto.addStore(store);
        }

        return simpleStoreDto.getStoreList();
    }
}


