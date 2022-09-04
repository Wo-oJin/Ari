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

    @Transactional
    public void saveStoreImage(Long store_id, List<MultipartFile> images) throws IOException{

        String fileUrl = System.getProperty("user.dir") + detailUrl;
        Store store = storeRepository.findById(store_id).orElseGet(null);

        for(MultipartFile image : images) {
            String originalFileName = image.getOriginalFilename();
            String fileName = UUID.randomUUID().toString(); //uuid
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
            store.addImgFile(storeImgFile);
        }

        storeRepository.save(store);
    }

    @Transactional
    public void saveArticleImage(Long articleId, List<MultipartFile> images) throws IOException{

        String fileUrl = System.getProperty("user.dir") + detailUrl;
        log.info("아이디 = {}", articleId);
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

    public List<String> getImage(Store store) throws IOException{
        List<String> base64Images = new ArrayList<>();
        List<StoreImgFile> storeImages = store.getStoreImgFiles();

        for(StoreImgFile storeImgFile : storeImages) {
            FileInputStream imageStream = new FileInputStream(storeImgFile.getFileUrl() + storeImgFile.getFilename());

            byte[] imgBytes = imageStream.readAllBytes();
            byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
            String imgStr = new String(byteEnc64, "UTF-8");

            base64Images.add(imgStr);
        }

        return base64Images;
    }

    public List<String> getArticleImage(Article article, int count) throws IOException{
        List<String> base64Images = new ArrayList<>();
        List<ArticleImgFile> articleImages = article.getImgFiles();

        for(int i=0;i<count;i++) {
            ArticleImgFile articleImgFile = articleImages.get(i);
            FileInputStream imageStream = new FileInputStream(articleImgFile.getFileUrl() + articleImgFile.getFilename());

            byte[] imgBytes = imageStream.readAllBytes();
            byte[] byteEnc64 = Base64.encodeBase64(imgBytes);
            String imgStr = new String(byteEnc64, "UTF-8");

            base64Images.add(imgStr);
        }

        return base64Images;
    }
}
