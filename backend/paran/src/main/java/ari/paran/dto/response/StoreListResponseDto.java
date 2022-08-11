package ari.paran.dto.response;

import ari.paran.domain.Store;
import lombok.Data;

import java.util.*;

@Data
public class StoreListResponseDto {

    private List<Store> storeList;
}
