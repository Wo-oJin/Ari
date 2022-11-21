package ari.paran.dto.response.store;

import ari.paran.domain.store.Address;
import ari.paran.domain.store.Store;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class EditInfoDto {

    private Long storeId;
    private String storeName;
    private String roadAddress;
    private String detailAddress;
    private String ownerName;
    private String phoneNumber;
    //private List<MultipartFile> newImages = new ArrayList<>();
    private String storePhoneNumber;
    private List<String> existingImages;
    private String subText;
    private String openHour;

    public EditInfoDto(Long id, String storeName, String roadAddress, String detailAddress, String ownerName,
                       String phoneNumber, String storePhoneNumber, List<String> existingImages, String subText, String openHour) {

        this.storeId = id;
        this.storeName = storeName;
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
        this.ownerName = ownerName;
        this.phoneNumber = phoneNumber;
        this.storePhoneNumber = storePhoneNumber;
        this.existingImages = existingImages;
        this.subText = subText;
        this.openHour = openHour;
    }

}
