package ari.paran.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthCheckController {

    // ROLE_USER만 접근 가능
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String getMyInfo() {
        return "user";
    }

    // ROLE_ADMIN만 접근 가능
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String getUserInfo() {
        return "superadmin";
    }
}
