package ari.paran.dto.response.store;

import ari.paran.domain.member.Authority;
import lombok.Builder;
import lombok.Data;

@Data
public class LikeListDto {
    String name;
    Long storeId;
    String address;
    String image;

    @Builder
    public LikeListDto(String name, Long storeId, String address, String image) {
        this.name = name;
        this.storeId = storeId;
        this.address = address;
        this.image = image;
    }
}
