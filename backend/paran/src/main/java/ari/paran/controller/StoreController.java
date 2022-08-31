package ari.paran.controller;

import ari.paran.domain.store.Store;
import ari.paran.dto.EditInfoDto;
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

        for (Store store : storeList) {
            simpleStoreDto.addStore(store, fileService, storeService);
        }

        return simpleStoreDto;
    }

    @GetMapping("/map/store/{store_id}")
    public DetailStoreDto detailStoreList(@PathVariable Long store_id, Principal principal) throws IOException {
        DetailStoreDto detailStoreDto = new DetailStoreDto();
        Store store = storeService.findStore(store_id);

        Long member_id = Long.valueOf(principal.getName());

        detailStoreDto.getStore(store, fileService, memberService.getMemberInfoById(member_id));

        return detailStoreDto;
    }

    @GetMapping("/edit/store")
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException {
        return storeService.existingInfo(principal);
    }

    @PostMapping("/edit/store")
    public ResponseEntity<?> editInfo(@ModelAttribute EditInfoDto editInfoDto, Principal principal) throws IOException {
        return storeService.editInfo(editInfoDto, principal);
    }

    @GetMapping("/edit/self-event")
    public ResponseEntity<?> existingEvent(Principal principal) {
        return storeService.existingEvent(principal);
    }

    @PostMapping("/edit/self-event")
    public ResponseEntity<?> editEvent(@RequestBody Map<String, String> param, Principal principal) {
        Integer eventNum = Integer.valueOf(param.get("eventNum"));
        String newInfo = param.get("newInfo");

        return storeService.editEvent(eventNum, newInfo, principal);
    }

    @PostMapping("/add/self-event")
    public ResponseEntity<?> addEvent(@RequestBody Map<String, String> param, Principal principal) {
        String info = param.get("info");

        return storeService.addEvent(info, principal);
    }

    @PostMapping("/delete/self-event")
    public ResponseEntity<?> deleteEvent(@RequestBody Map<String, String> param, Principal principal) {
        Integer eventNum = Integer.valueOf(param.get("eventNum"));

        return storeService.deleteEvent(eventNum, principal);
    }

    /*
    @GetMapping("/map/partners/{store_name}")
    public List<String> getPartners(@PathVariable String store_name){
        return storeService.getPartners(store_name);
    }
    */

}
