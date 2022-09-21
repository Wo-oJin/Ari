package ari.paran.dto.response.store;

import lombok.Builder;
import lombok.Data;

@Data
public class LikeStoreListDto {
    String name;
    Long storeId;
    String address;
    String image;

    @Builder
    public LikeStoreListDto(String name, Long storeId, String address, String image) {
        this.name = name;
        this.storeId = storeId;
        this.address = address;
        this.image = image;
    }
}
