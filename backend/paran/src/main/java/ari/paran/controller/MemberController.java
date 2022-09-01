package ari.paran.controller;

import ari.paran.domain.member.Member;
import ari.paran.dto.MemberResponseDto;
import ari.paran.dto.Response;
import ari.paran.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final Response response;

    @PostMapping("/favorite/add")
    public ResponseEntity<?> addMemberFavoriteStore(@RequestParam Long storeId, Principal principal){
        Long memberId = Long.parseLong(principal.getName());
        return memberService.addMemberFavoriteStore(memberId, storeId);
    }

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
}
