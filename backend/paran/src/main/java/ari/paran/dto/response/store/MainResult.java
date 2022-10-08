package ari.paran.dto.response.store;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class MainResult<T>{
    int count;
    private T storeList;

    public MainResult(int count, T storeList){
        this.count = count;
        this.storeList = storeList;
    }

    public MainResult(T storeList){
        this.storeList = storeList;
    }
}
