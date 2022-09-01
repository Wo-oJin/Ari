package ari.paran.controller;

import ari.paran.dto.*;
import ari.paran.dto.request.LoginDto;
import ari.paran.dto.request.SignupDto;
import ari.paran.dto.request.TokenRequestDto;
import ari.paran.service.auth.Helper;
import ari.paran.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class JwtController {

    private final MemberService memberService;
    private final Response response;

    @PostMapping("/signup-user")
    public ResponseEntity<?> signupUser(@RequestBody SignupDto signupDto, Errors errors) {
        //validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.signupUser(signupDto);
    }

    @PostMapping("/signup-owner")
    public ResponseEntity<?> signupOwner(@RequestBody SignupDto signupDto, Errors errors) {
        //validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.signupOwner(signupDto);
    }

    @PostMapping("/signup-code")
    public ResponseEntity<?> authSignupCode(@RequestBody Map<String, String> param, Errors errors) {
        String code = param.get("code");
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.authSignupCode(code);
    }

    @PostMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> param) {
        String email = param.get("email");
        return memberService.sendEmail(email);
    }

    @PostMapping("email-auth")
    public ResponseEntity<?> authEmail(@RequestBody Map<String, String> param) {
        String code = param.get("code");
        return memberService.authEmail(code);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, Errors errors) throws URISyntaxException {
        //validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.login(loginDto);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenRequestDto reissue, Errors errors) {
        //validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.reissue(reissue);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody TokenRequestDto logout, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return memberService.logout(logout);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> param, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        String email = param.get("email");
        String newPassword = param.get("newPassword");
        return memberService.changePassword(email, newPassword);
    }
}