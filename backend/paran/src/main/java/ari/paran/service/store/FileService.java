package ari.paran.service.store;

import ari.paran.domain.repository.StoreRepository;
import ari.paran.domain.store.StoreImgFile;
import ari.paran.domain.store.Store;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@Slf4j
public class FileService {

    @Autowired
    StoreRepository storeRepository;

    public void saveImage(Long store_id, List<MultipartFile> images) throws IOException{

        String fileUrl = "C://Users//김우진//Desktop//파란학기//프로젝트//backend//paran//src//main//resources//images/";
        Store store = storeRepository.findById(store_id).orElseGet(null);

        for(MultipartFile image : images) {
            String fileName = image.getOriginalFilename();
            //String extension = StringUtils.getFilenameExtension(fileName).toLowerCase();
            File destinationFile = new File(fileUrl + fileName);

            destinationFile.getParentFile().mkdirs();
            image.transferTo(destinationFile);

            StoreImgFile storeImgFile = StoreImgFile.builder()
                            .store(store)
                            .filename(fileName)
                            .fileUrl(fileUrl).build();

            store.addImgFile(storeImgFile);
        }

        storeRepository.save(store);
    }

    public List<String> getImage(Store store) throws IOException{
        List<String> base64Images = new ArrayList<>();
        List<StoreImgFile> storeImages = store.getStoreImgFiles();

        for(StoreImgFile storeImgFile : storeImages) {
            InputStream in = getClass().getResourceAsStream("/images/" + storeImgFile.getFilename());
            //InputStream in = getClass().getResourceAsStream("/images/" + "iu.jpg");

            byte[] imgBytes = in.readAllBytes();
            byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
            String imgStr = new String(byteEnc64, "UTF-8");

            base64Images.add(imgStr);
        }

        return base64Images;
    }
}
