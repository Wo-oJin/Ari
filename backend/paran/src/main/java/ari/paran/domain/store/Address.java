package ari.paran.domain.store;

import lombok.*;

import javax.persistence.Embeddable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
@RequiredArgsConstructor
public class Address {
    private String roadAddress;
    private String detailAddress;

    public Address(String roadAddress, String detailAddress){
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
    }
}
