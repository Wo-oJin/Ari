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

    @Value("${file.path}")
    private String detailUrl;

    @Value("${local.path}")
    private String localDetailUrl;

    @Transactional
    public void saveStoreImage(Long storeId, List<MultipartFile> images) throws IOException{

        if(images == null)
            return;

        //String fileUrl = "/Users/jsc/ari_files/";
        String fileUrl = System.getProperty("user.dir") + localDetailUrl;
        Store store = storeRepository.findById(storeId).orElseGet(null);

        for(MultipartFile image : images) {
            String originalFileName = image.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() +
                    originalFileName.substring(originalFileName.lastIndexOf(".")); //uuid
            File destinationFile = new File(fileUrl + fileName);

            destinationFile.getParentFile().mkdirs();
            image.transferTo(destinationFile);

            StoreImgFile storeImgFile = StoreImgFile.builder()
                            .store(store)
                            .originalFileName(originalFileName)
                            .filename(fileName)
                            .fileUrl(fileUrl).build();

            store.addImgFile(storeImgFile);

            storeImgFileRepository.save(storeImgFile);
        }

        storeRepository.save(store);
    }

    @Transactional
    public void saveArticleImage(Long articleId, List<MultipartFile> images) throws IOException{

        if(images == null)
            return;

        String fileUrl = System.getProperty("user.dir") + localDetailUrl;
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

    public List<String> loadImage(Store store) throws IOException{
        List<StoreImgFile> storeImages = store.getStoreImgFiles();
        List<String> base64Images = new ArrayList<>();

        if(storeImages.isEmpty()){
            String fileUrl = System.getProperty("user.dir") + localDetailUrl;

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

    public List<String> getArticleImage(Article article, int count) throws IOException{
        List<String> base64Images = new ArrayList<>();
        List<ArticleImgFile> articleImages = article.getImgFiles();

        if(articleImages.isEmpty()){
            String fileUrl = System.getProperty("user.dir") + localDetailUrl;
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
                String fileUrl = System.getProperty("user.dir") + localDetailUrl;
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
