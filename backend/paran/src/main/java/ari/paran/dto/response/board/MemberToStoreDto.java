package ari.paran.dto.response.board;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberToStoreDto {

    private String owner;
    private String storeName;

}
