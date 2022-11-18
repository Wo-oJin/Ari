package ari.paran.controller;

import ari.paran.domain.member.Member;
import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.dto.response.board.article.MemberToStoreDto;
import ari.paran.dto.response.MainResult;
import ari.paran.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.io.IOException;
import java.security.Principal;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final Response response;

    @GetMapping("/stores")
    public MainResult getAuthorStore(Principal principal) {
        Long memberId = Long.parseLong(principal.getName());
        Member member = memberService.getMemberInfoById(memberId);

        List<MemberToStoreDto> result =
                member.getStores().stream()
                        .map(store -> new MemberToStoreDto(store.getId(), store.getName()))
                        .collect(Collectors.toList());

        return new MainResult(result);
    }


    @PostMapping("/favorite/toggle")
    public ResponseEntity<?> addMemberFavoriteStore(@RequestParam Long storeId, Principal principal) {
        Long memberId = Long.parseLong(principal.getName());
        return memberService.toggleMemberFavoriteStore(memberId, storeId);
    }

    @GetMapping("/favorite_list")
    public List<Long> getMemberFavoriteStore(Principal principal) {
        Long memberId = Long.parseLong(principal.getName());
        Member member = memberService.getMemberInfoById(memberId);

        return member.getFavoriteStoreId();
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @GetMapping("/{email}")
    public ResponseEntity<MemberResponseDto> getMemberInfo(@PathVariable String email) {
        System.out.println("email: " + email);
        return ResponseEntity.ok(memberService.getMemberInfoByEmail(email));
    }

    // 권한 테스트
    @GetMapping("/userTest")
    public ResponseEntity<?> userTest() {
        log.info("ROLE_USER TEST");
        return response.success();
    }

    @GetMapping("/ownerTest")
    public ResponseEntity<?> ownerTest() {
        log.info("ROLE_OWNER TEST");
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }

    @GetMapping("/like")
    public ResponseEntity<?> likeList(Principal principal) throws IOException {

        return memberService.showLikeList(principal);
    }

    @GetMapping("/event-num")
    public ResponseEntity<?> getEventNum(Principal principal) {
        return memberService.getEventNum(principal);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(Principal principal) {

        long memberId = Long.parseLong(principal.getName());

        return memberService.getHistory(memberId);
    }
    /*
    @PostMapping("/like/add/{store_name}")
    public ResponseEntity<?> addLike(@PathVariable Long storeId, Principal principal) {

        return memberService.addLike(storeId, principal);
    }
    @PostMapping("/like/delete/{store_name}")
    public ResponseEntity<?> deleteLike(@PathVariable Long storeId, Principal principal) {
        return memberService.deleteLike(storeId, principal);
    }
    */
}
