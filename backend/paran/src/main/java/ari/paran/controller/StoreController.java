package ari.paran.controller;

import ari.paran.domain.store.Store;
import ari.paran.dto.Response;
import ari.paran.dto.response.store.DetailStoreDto;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.jwt.JwtFilter;
import ari.paran.service.Helper;
import ari.paran.service.store.FileService;

import ari.paran.service.store.StoreService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.util.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreService storeService;
    private final FileService fileService;
    private final JwtFilter jwtFilter;

    @GetMapping("/map/store")
    @ResponseBody
    public SimpleStoreDto simpleStoreList() throws IOException {
        SimpleStoreDto simpleStoreDto = new SimpleStoreDto();
        List<Store> storeList = storeService.findStores();

        for(Store store : storeList){
            simpleStoreDto.addStore(store, fileService, storeService);
        }

        return simpleStoreDto;
    }

    @GetMapping("/map/store/{store_id}")
    public DetailStoreDto detailStoreList(@PathVariable Long store_id) throws IOException {
        DetailStoreDto detailStoreDto = new DetailStoreDto();
        Store store = storeService.findStore(store_id);

        detailStoreDto.addStore(store, fileService);

        return detailStoreDto;
    }

    @GetMapping("/edit/store")
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException{
        return storeService.existingInfo(principal);
    }

//    @PostMapping("/edit/store")
//    public ResponseEntity<?> editInfo(@RequestParam String name, @RequestParam String address, @RequestParam String ownerName,
//                                      @RequestParam String phoneNumber, @RequestParam List<MultipartFile> images, @RequestParam String subText,
//                                      @RequestParam String openHour, Principal principal) {
//
//    }

    /*
    @GetMapping("/map/partners/{store_name}")
    public List<String> getPartners(@PathVariable String store_name){
        return storeService.getPartners(store_name);
    }
    */

}
