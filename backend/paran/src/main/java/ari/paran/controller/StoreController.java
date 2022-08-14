package ari.paran.controller;

import ari.paran.domain.store.ImgFiles;
import ari.paran.domain.store.Store;
import ari.paran.domain.Repository.StoreRepository;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.service.store.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOError;
import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/map")
public class StoreController {

    @Autowired
    FileService fileService;

    private final StoreRepository storeRepository;

    @GetMapping("/store")
    public SimpleStoreDto storeList(){
        SimpleStoreDto simpleStoreDto = new SimpleStoreDto();
        List<Store> storeList = storeRepository.findAll();

        for(Store store : storeList){
            simpleStoreDto.addStore(store);
        }

        return simpleStoreDto;
    }

    @PostMapping("/map/store/upload")
    public String saveFIle(@RequestParam String storeName, @RequestPart MultipartFile files,
                           HttpServletRequest request) throws IOException{

        ImgFiles file = new ImgFiles();

        String sourceFileName = files.getOriginalFilename();
        String sourceFileNameExtension = StringUtils.getFilenameExtension(sourceFileName).toLowerCase();

        return null;
    }


}


