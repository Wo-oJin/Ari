package ari.paran.service.store;

import ari.paran.domain.Repository.StoreRepository;
import ari.paran.domain.store.ImgFile;
import ari.paran.domain.store.Store;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FileService {

    @Autowired
    StoreRepository storeRepository;

    public void saveImage(Long store_id, MultipartFile file) throws IOException{

        String fileUrl = "C://Users//김우진//Desktop//파란학기//프로젝트//backend//paran//src//main//resources//images/";

        String fileName = file.getOriginalFilename();
        //String extension = StringUtils.getFilenameExtension(fileName).toLowerCase();
        File destinationFile = new File(fileUrl + fileName);

        System.out.println("store_id: " + destinationFile.getPath());

        destinationFile.getParentFile().mkdirs();
        file.transferTo(destinationFile);

        ImgFile imgFile = new ImgFile();
        imgFile.setFilename(fileName);
        imgFile.setFileurl(fileUrl);

        Store store = storeRepository.findById(store_id).orElseGet(null);
        store.setImgFile(imgFile);

        storeRepository.save(store);
    }

    public String getImage(Store store) throws IOException{
        ImgFile file = store.getImgFile();
        //InputStream in = getClass().getResourceAsStream("/images/" + file.getFilename());
        InputStream in = getClass().getResourceAsStream("/images/" + "iu.jpg");

        byte[] imgBytes = in.readAllBytes();
        byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
        String imgStr = new String(byteEnc64, "UTF-8");

        return imgStr;
    }
}
