package ari.paran.controller;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Store;
import ari.paran.dto.EditInfoDto;
import ari.paran.dto.response.store.DetailStoreDto;
import ari.paran.dto.response.store.MainResult;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.service.auth.MemberService;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public MainResult simpleStoreList() throws IOException {
        List<SimpleStoreDto> simpleStoreDtoList = new ArrayList<>();
        List<Store> storeList = storeService.findStores();

        for(Store store : storeList){
            SimpleStoreDto simpleStoreDto = new SimpleStoreDto(store);
            simpleStoreDto.setPartnersName(storeService.getPartnersName(store.getName()));
            simpleStoreDto.setImage(fileService.loadImage(store));

            simpleStoreDtoList.add(simpleStoreDto);
        }

        return new MainResult(simpleStoreDtoList);
    }

    @GetMapping("/map/store/{store_id}")
    public DetailStoreDto detailStoreList(@PathVariable Long store_id, Principal principal) throws IOException {

        Store store = storeService.findStore(store_id);
        Member member = memberService.getMemberInfoById(Long.valueOf(principal.getName()));

        DetailStoreDto detailStoreDto = new DetailStoreDto(store);
        detailStoreDto.setStoreImages(fileService.loadImage(store));
        detailStoreDto.setFavorite(member.favoriteStore(store));

        return detailStoreDto;
    }

    @GetMapping("/edit/store")
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException {
        return storeService.existingInfo(principal);
    }

    @PostMapping("/edit/store")
    public ResponseEntity<?> editInfo(@ModelAttribute EditInfoDto editInfoDto,
                                      @RequestParam(value = "newImages", required = false) List<MultipartFile> images,
                                      Principal principal) throws IOException {
        return storeService.editInfo(editInfoDto, images, principal);
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

}
