package ari.paran.controller;

import ari.paran.domain.Store;
import ari.paran.dto.response.StoreListResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/map")
public class StoreController {

    @GetMapping("/store")
    public StoreListResponseDto storeList(){
        return null;
    }
}
