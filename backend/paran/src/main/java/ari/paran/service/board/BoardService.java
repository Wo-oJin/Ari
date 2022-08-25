package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.ArticleImgFilesRepository;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.service.store.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FileService fileService;

    public Page<Article> articleList(Pageable pageable){
        return boardRepository.findAll(pageable);
    }

    public Article articleFind(Long articleId){
        return boardRepository.findById(articleId).orElse(null);
    }

    public Page<Article> articleSearch(Pageable pageable, String keyword){
        return boardRepository.findByTitleContaining(keyword, pageable);
    }

    public Long articleSave(Article article, List<MultipartFile> files) throws IOException {
        if(files!=null)
            fileService.saveArticleImage(article.getId(), files);
        boardRepository.save(article);

        return article.getId();
    }

    public void articleDelete(Long articleId){
        boardRepository.deleteById(articleId);
    }
}
