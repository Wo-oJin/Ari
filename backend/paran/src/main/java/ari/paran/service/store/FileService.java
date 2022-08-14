package ari.paran.service.store;

import ari.paran.domain.Repository.StoreRepository;
import ari.paran.domain.store.ImgFiles;
import ari.paran.domain.store.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class FileService {

    @Autowired
    StoreRepository storeRepository;

    public void save(Long store_id, ImgFiles imgFiles){
        Store store = storeRepository.findById(store_id).orElseGet(null);

        if(store != null) {
            store.setImgFiles(imgFiles);
            storeRepository.save(store);
        }
        else{
            throw new NoSuchElementException();
        }

    }
}
