package ari.paran.controller;

import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.service.auth.MemberService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.Principal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final Response response;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo(){
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @GetMapping("/{email}")
    public ResponseEntity<MemberResponseDto> getMemberInfo(@PathVariable String email){
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

    @PostMapping("/like/add/{store_name}")
    public ResponseEntity<?> addLike(@PathVariable String store_name, Principal principal) {

        return memberService.addLike(store_name, principal);
    }
    @PostMapping("/like/delete/{store_name}")
    public ResponseEntity<?> deleteLike(@PathVariable String store_name, Principal principal) {
        return memberService.deleteLike(store_name, principal);
    }
}
