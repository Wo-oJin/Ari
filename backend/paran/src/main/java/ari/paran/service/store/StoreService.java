package ari.paran.service.store;

import ari.paran.domain.Partnership;
import ari.paran.domain.Repository.PartnershipRepository;
import ari.paran.domain.Repository.StoreRepository;
import ari.paran.domain.store.Store;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final PartnershipRepository partnershipRepository;

    public List<Store> findStores(){
        return storeRepository.findAll();
    }

    public Store findStore(Long store_id){
        return storeRepository.findById(store_id).orElseGet(null);
    }

    /*
    public List<String> getPartners(String storeName){

        List<Partnership> partnershipList = partnershipRepository.selectByStoreName(storeName);

        return partnershipList.stream()
                .map(Partnership :: getPartnerName)
                .collect(Collectors.toList());
    }
    */

}
