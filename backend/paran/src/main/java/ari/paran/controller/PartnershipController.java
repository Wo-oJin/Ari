package ari.paran.controller;

import ari.paran.domain.store.Partnership;
import ari.paran.dto.request.PartnershipRequestDto;
import ari.paran.service.store.PartnershipService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/partnership")
public class PartnershipController {

    private final PartnershipService partnershipService;
    private final StoreService storeService;

    /**
     * 협약하기 버튼 누를 시 누른 사람의 가게 id/이름 가져오기
     */
    @GetMapping("/store-list")
    public ResponseEntity<?> getStoreNameList(Principal principal) {

        Long fromOwnerId = Long.parseLong(principal.getName());

        return storeService.getStoreNameList(fromOwnerId);
    }

    /**
     * 협약맺기 버튼 누르면 작성 내용 테이블에 반영
     */
    @PostMapping("/request")
    public ResponseEntity<?> requestPartnership(@RequestBody PartnershipRequestDto requestDto) {

        return partnershipService.requestPartnership(requestDto);
    }

    /**
     * 받은 협약의 id와 발신 가게 받아오기
     */
    @GetMapping("/received")
    public ResponseEntity<?> getReceivedRequestList(@RequestParam Long storeId) {

        return partnershipService.getReceivedRequestList(storeId);
    }

    @GetMapping("/send")
    public ResponseEntity<?> getSendRequestList(@RequestParam Long storeId) {

        return partnershipService.getSendRequestList(storeId);
    }

    @GetMapping("/completed")
    public ResponseEntity<?> getCompletedRequestList(@RequestParam Long storeId) {

        return partnershipService.getCompletedList(storeId);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getPartnershipInfo(@RequestParam Long storeId, @RequestParam Long partnershipId) {

        return partnershipService.getPartnershipInfo(storeId, partnershipId);
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approvePartnership(@RequestParam Long storeId, @RequestParam Long partnershipId) {

        return partnershipService.approvePartnership(storeId, partnershipId);
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectPartnership(@RequestParam Long storeId, @RequestParam Long partnershipId) {

        return partnershipService.rejectPartnership(storeId, partnershipId);
    }
}
