package ari.paran.controller;

import ari.paran.domain.Store;
import ari.paran.dto.response.StoreListResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/map")
public class StoreController {

    @GetMapping("/store")
    public StoreListResponseDto storeList(){
        Store store1 = new Store("미스터쉐프", "경기 수원시 팔달구 아주로 47번길 16");
        Store store2 = new Store("아맛집", "경기 수원시 팔달구 아주로 13번길 19 골든파크");

        StoreListResponseDto storeListResponseDto = new StoreListResponseDto();

        List<Store> storeList = new ArrayList<>();
        storeList.add(store1);
        storeList.add(store2);

        storeListResponseDto.setStoreList(storeList);

        return storeListResponseDto;
    }
}
