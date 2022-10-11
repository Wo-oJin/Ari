package ari.paran.service.store;

import ari.paran.domain.board.Article;
import ari.paran.domain.board.ArticleImgFile;
import ari.paran.domain.repository.ArticleImgFilesRepository;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.domain.repository.StoreImgFileRepository;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.domain.store.StoreImgFile;
import ari.paran.domain.store.Store;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
@Slf4j
public class FileService {

    @Autowired StoreRepository storeRepository;
    @Autowired BoardRepository boardRepository;
    @Autowired ArticleImgFilesRepository articleImgFilesRepository;
    @Autowired StoreImgFileRepository storeImgFileRepository;

    @Value("${resource.path}")
    private String resourceUrl;

    private String detailUrl = "C:\\Users\\김우진\\Desktop\\image\\";


    /**
     * 기존 가게의 이미지를 저장
     */
    @Transactional
    public void saveStoreImage(Store store, List<MultipartFile> images) throws IOException{
        /*1. 아무 이미지가 없으면 바로 반환*/
        if(images == null)
            return;

        /*2. 파일이 저장될 경로를 설정해준다.*/
        String fileUrl = detailUrl;

        /*3. images에 있는 multipartFile 객체 image를 하나씩 확인하면서 저장 폴더에 저장하고 DB에 기록한다.*/
        for(MultipartFile image : images) {
            /*3-1. 클라이언트에서 보낼 당시의 파일 이름*/
            String originalFileName = image.getOriginalFilename();

            /*3-2. 실제로 저장될 파일이름을 uuid로 설정하여 중복을 방지*/
            String fileName = UUID.randomUUID().toString() +
                    originalFileName.substring(originalFileName.lastIndexOf("."));
            File destinationFile = new File(fileUrl + fileName);

            destinationFile.getParentFile().mkdirs();
            image.transferTo(destinationFile); // 파일을 설정한 경로에 저장

            /*3-3. storeImgFile 객체에 저장된 파일에 대한 정보 담음*/
            StoreImgFile storeImgFile = StoreImgFile.builder()
                            .store(store)
                            .originalFileName(originalFileName)
                            .filename(fileName)
                            .fileUrl(fileUrl).build();

            store.addImgFile(storeImgFile); // store의 ImgFile에 추가

            storeImgFileRepository.save(storeImgFile);
        }

        storeRepository.save(store);
    }

    @Transactional
    public void saveArticleImage(Long articleId, List<MultipartFile> images) throws IOException{

        if(images == null)
            return;

        String fileUrl = detailUrl;
        Article article = boardRepository.findById(articleId).orElse(null);

        if(images!=null) {
            for (MultipartFile image : images) {
                String originalFileName = image.getOriginalFilename();
                String fileName = UUID.randomUUID().toString(); //uuid
                File destinationFile = new File(fileUrl + fileName);

                destinationFile.getParentFile().mkdirs();
                image.transferTo(destinationFile);

                ArticleImgFile articleImgFile = ArticleImgFile.builder()
                        .article(article)
                        .originalFileName(originalFileName)
                        .filename(fileName)
                        .fileUrl(fileUrl).build();

                article.addImgFile(articleImgFile);
                articleImgFilesRepository.save(articleImgFile);
            }
        }
    }

    @Transactional
    public void changeArticleImage(Long articleId, List<MultipartFile> images) throws IOException {
        articleImgFilesRepository.deleteAll();

        saveArticleImage(articleId, images);
    }

    public List<String> getStoreImages(Store store) throws IOException{
        List<StoreImgFile> storeImages = store.getStoreImgFiles();
        List<String> base64Images = new ArrayList<>();

        if(storeImages.isEmpty()){
            String fileUrl = System.getProperty("user.dir") + resourceUrl;

            String fileName = "ari.PNG";

            FileInputStream imageStream = new FileInputStream(fileUrl + fileName);
            byte[] bytes = Base64.encodeBase64(imageStream.readAllBytes());
            String result = new String(bytes, "UTF-8");
            imageStream.close();

            base64Images.add(result);
        }
        else {
            for (StoreImgFile imgFile : storeImages) {
                FileInputStream imageStream = new FileInputStream(imgFile.getFileUrl() + imgFile.getFilename());
                byte[] bytes = Base64.encodeBase64(imageStream.readAllBytes());
                String result = new String(bytes, "UTF-8");
                imageStream.close();

                base64Images.add(result);
            }
        }

        return base64Images;
    }

    public List<String> getArticleImages(Article article, int count) throws IOException{
        List<String> base64Images = new ArrayList<>();
        List<ArticleImgFile> articleImages = article.getImgFiles();

        if(articleImages.isEmpty()){
            String fileUrl = System.getProperty("user.dir") + resourceUrl;
            String fileName = "ari.PNG";

            FileInputStream imageStream = new FileInputStream(fileUrl + fileName);
            byte[] bytes = Base64.encodeBase64(imageStream.readAllBytes());
            String result = new String(bytes, "UTF-8");
            imageStream.close();

            base64Images.add(result);
        }else {
            for (int i = 0; i < count; i++) {
                ArticleImgFile articleImgFile = articleImages.get(i);
                FileInputStream imageStream = new FileInputStream(articleImgFile.getFileUrl() + articleImgFile.getFilename());

                byte[] imgBytes = imageStream.readAllBytes();
                byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
                String imgStr = new String(byteEnc64, "UTF-8");

                base64Images.add(imgStr);
            }
        }

        return base64Images;
    }

    public String getMainStoreImage(Store store) throws IOException{
        try {
            List<StoreImgFile> storeImages = store.getStoreImgFiles();

            if(storeImages.isEmpty()) {
                String fileUrl = System.getProperty("user.dir") + resourceUrl;
                String fileName = "ari.PNG";
                FileInputStream imageStream = new FileInputStream(fileUrl + fileName);

                byte[] byteEnc64 = Base64.encodeBase64(imageStream.readAllBytes());
                String imgStr = new String(byteEnc64, "UTF-8");
                imageStream.close();

                return imgStr;
            }
            else {
                StoreImgFile mainImage = storeImages.get(0);
                FileInputStream imageStream = new FileInputStream(mainImage.getFileUrl() + mainImage.getFilename());

                byte[] imgBytes = imageStream.readAllBytes();
                byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
                String imgStr = new String(byteEnc64, "UTF-8");

                imageStream.close();
                return imgStr;
            }
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    public String getMainArticleImage(Article article) throws IOException{
        try {
            ArticleImgFile mainImage = article.getImgFiles().get(0);

            FileInputStream imageStream = new FileInputStream(mainImage.getFileUrl() + mainImage.getFilename());

            byte[] imgBytes = imageStream.readAllBytes();
            byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
            String imgStr = new String(byteEnc64, "UTF-8");

            imageStream.close();
            return imgStr;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

}
