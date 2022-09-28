package ari.paran.controller;

import ari.paran.domain.store.Store;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/image")
public class ImageController {

    private final StoreService storeService;
    private final FileService fileService;

    @GetMapping("/upload")
    public String uploadImage(){
        return "upload";
    }

    @GetMapping("/get/{store_id}")
    public String getImage(@PathVariable Long store_id, Model model) throws IOException {
        Store store = storeService.findStore(store_id);
        List<String> fileImg = fileService.loadImage(store);

        System.out.println(fileImg.size());

        model.addAttribute("storeImg", fileImg);
        return "imageCheck";
    }

}
