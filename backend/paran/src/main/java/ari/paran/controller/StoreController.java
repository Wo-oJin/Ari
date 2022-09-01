package ari.paran.controller;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;
import ari.paran.dto.response.store.DetailStoreDto;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.service.auth.MemberService;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.security.Principal;
import java.util.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreService storeService;
    private final FileService fileService;
    private final MemberService memberService;

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
    public DetailStoreDto detailStoreList(@PathVariable Long store_id, Principal principal) throws IOException {

        Store store = storeService.findStore(store_id);
        Member member = memberService.getMemberInfoById(Long.valueOf(principal.getName()));

        DetailStoreDto detailStoreDto = new DetailStoreDto(store);
        detailStoreDto.setStoreImages(fileService.getImage(store));
        detailStoreDto.setFavoriteList(member.getFavoriteStoreId());

        return detailStoreDto;
    }

    @GetMapping("/edit/store")
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException{
        return storeService.existingInfo(principal);
    }

    /*
    @GetMapping("/map/partners/{store_name}")
    public List<String> getPartners(@PathVariable String store_name){
        return storeService.getPartners(store_name);
    }
    */

}
