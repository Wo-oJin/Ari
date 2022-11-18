package ari.paran.controller;

import ari.paran.service.HistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/history")
public class HistoryController {

    private final HistoryService historyService;

    @PostMapping("/check-code")
    public ResponseEntity<?> checkStoreCode(@RequestParam String code, @RequestParam Long ownerId) {

        return historyService.checkStoreCode(ownerId, code);
    }

    @PostMapping("/record")
    public ResponseEntity<?> recordButtonHistory(@RequestBody Map<String, String> body, Principal principal) {
        String storeName = body.get("storeName");
        String eventInfo = body.get("eventInfo");
        long memberId = Long.parseLong(principal.getName());

        return historyService.recordHistory(memberId, storeName, eventInfo);
    }

//    @PostMapping("/record-code")
//    public ResponseEntity<?> recordCodeHistory(@RequestBody Map<String, String> body, Principal principal) {
//        String storeName = body.get("storeName");
//        String eventInfo = body.get("eventInfo");
//        long memberId = Long.parseLong(principal.getName());
//
//        return historyService.recordCodeHistory(memberId, storeName, eventInfo);
//    }
}
