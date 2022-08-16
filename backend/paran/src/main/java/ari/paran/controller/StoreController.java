package ari.paran.controller;

import ari.paran.domain.store.Store;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.service.store.FileService;

import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreService storeService;
    private final FileService fileService;

    @GetMapping("map/store")
    @ResponseBody
    public SimpleStoreDto storeList() throws IOException {
        SimpleStoreDto simpleStoreDto = new SimpleStoreDto();
        List<Store> storeList = storeService.findStores();

        for(Store store : storeList){
            simpleStoreDto.addStore(store, fileService);
        }

        return simpleStoreDto;
    }


}


