package ari.paran.dto.response.store;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MainResult<T>{
    private T storeList;
}
