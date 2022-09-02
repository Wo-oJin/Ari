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
    public List<SimpleStoreDto> simpleStoreList() throws IOException {
        List<SimpleStoreDto> simpleStoreDtoList = new ArrayList<>();
        List<Store> storeList = storeService.findStores();

        for(Store store : storeList){
            SimpleStoreDto simpleStoreDto = new SimpleStoreDto(store);
            simpleStoreDto.setPartnersName(storeService.getPartnersName(store.getName()));
            simpleStoreDto.setImage(fileService.getImage(store));

            simpleStoreDtoList.add(simpleStoreDto);
        }

        return simpleStoreDtoList;
    }

    @GetMapping("/map/store/{store_id}")
    public DetailStoreDto detailStoreList(@PathVariable Long store_id, Principal principal) throws IOException {

        Store store = storeService.findStore(store_id);
        Member member = memberService.getMemberInfoById(Long.valueOf(principal.getName()));

        DetailStoreDto detailStoreDto = new DetailStoreDto(store);
        detailStoreDto.setStoreImages(fileService.getImage(store));
        detailStoreDto.setFavorite(member.favoriteStore(store));

        return detailStoreDto;
    }

    @GetMapping("/edit/store")
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException{
        return storeService.existingInfo(principal);
    }

}
