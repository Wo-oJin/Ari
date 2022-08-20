package ari.paran.dto.request;

import ari.paran.domain.Authority;
import ari.paran.domain.Member;
import ari.paran.domain.store.Store;
import ari.paran.domain.store.Address;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Slf4j
public class SignupDto {

    @NotBlank(message = "아이디를 입력해주세요")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{5,30}$", message = "아이디는 특수문자를 제외한 5자이상이여야 합니다")
    private String username;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}", message = "최소 하나의 문자 및 숫자를 포함한 8~16자이여야 합니다")
    private String password;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다")
    private String email;

    @NotBlank(message = "별명을 입력해주세요")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z]{2,30}$", message = "숫자 또는 특수문자를 제외한 2자이상 입력해주세요")
    private String nickname;

    private int age;

    private String gender;

    private Authority authority = Authority.ROLE_USER;

    private boolean fromOauth = false;

    private String storeName;
    private String ownerName;

    private Address address;

    @Pattern(regexp = "^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$", message = "휴대폰번호를 확인해 주세요")
    private String phoneNumber;


    public boolean getFromAuth(){
        return this.fromOauth;
    }

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .gender(gender)
                .age(age)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public Store toStore(Member member) {
        return Store.builder()
                .name(storeName)
                .ownerName(ownerName)
                .address(address)
                .phoneNumber(phoneNumber)
                .member(member)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}
