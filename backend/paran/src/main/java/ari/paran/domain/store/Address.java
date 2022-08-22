package ari.paran.domain.store;

import lombok.*;

import javax.persistence.Embeddable;

@Getter
@Embeddable
@RequiredArgsConstructor
@AllArgsConstructor
public class Address {

    private String roadAddress;
    private String detailAddress;


}
