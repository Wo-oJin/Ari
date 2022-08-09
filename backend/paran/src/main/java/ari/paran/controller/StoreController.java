package ari.paran.controller;

import ari.paran.domain.Store;
import ari.paran.domain.StoreRepository;
import ari.paran.dto.response.StoreListResponseDto;
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
    public StoreListResponseDto storeList(){
        List<Store> storeList = storeRepository.findAll();
        StoreListResponseDto storeListResponseDto = new StoreListResponseDto();

        log.info("파트너 = {}", storeList.get(0).getPartnershipList().get(0).getInfo().toString());

        storeListResponseDto.setStoreList(storeList);
        return storeListResponseDto;
    }
}
