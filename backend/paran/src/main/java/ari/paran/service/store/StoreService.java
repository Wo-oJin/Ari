package ari.paran.service.store;

import ari.paran.domain.Repository.StoreRepository;
import ari.paran.domain.store.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StoreService {

    @Autowired
    StoreRepository storeRepository;

    public List<Store> findStores(){
        return storeRepository.findAll();
    }

    public Store findStore(Long store_id){
        return storeRepository.findById(store_id).orElseGet(null);
    }
}
