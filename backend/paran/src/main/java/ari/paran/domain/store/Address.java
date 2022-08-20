package ari.paran.domain.store;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Embeddable
public class Address {

    private String roadAddress;
    private String detailAddress;

    protected Address(){};

    protected Address(String roadAddress, String detailAddress){
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
    }
}
