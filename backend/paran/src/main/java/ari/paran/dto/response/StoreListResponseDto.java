package ari.paran.dto.response;

import ari.paran.domain.store.Store;
import lombok.Data;

import java.util.*;

@Data
public class StoreListResponseDto {

    private List<Store> storeList;
}
