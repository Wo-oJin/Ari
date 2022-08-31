package ari.paran.dto;

import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class EditInfoDto {
    private String storeName;
    private String roadAddress;
    private String detailAddress;
    private String ownerName;
    private String phoneNumber;
    private List<MultipartFile> newImages;
    private List<String> existingImages;
    private String subText;
    private String openHour;

    public EditInfoDto(String storeName, String roadAddress, String detailAddress, String ownerName, String phoneNumber, List<String> existingImages, String subText, String openHour) {
        this.storeName = storeName;
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
        this.ownerName = ownerName;
        this.phoneNumber = phoneNumber;
        this.existingImages = existingImages;
        this.subText = subText;
        this.openHour = openHour;
    }
}
