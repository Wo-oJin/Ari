package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.service.store.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FileService fileService;

    public List<SimpleArticleDto> getArticleList(Pageable pageable, String keyword){

        Page<Article> board;

        if(keyword == null)
            board = boardRepository.findAll(pageable);
        else
            board = boardRepository.findByTitleContaining(keyword, pageable);

        return board.stream()
                .map(article -> SimpleArticleDto.builder()
                        .id(article.getId())
                        .title(article.getTitle())
                        .author(article.getAuthor())
                        .createDate(article.getCreateDate())
                        .image(article.getImgFiles().isEmpty() ? null : article.getImgFiles().get(0))
                        .build())
                .collect(Collectors.toList());
    }

    public DetailArticleDto findArticle(Long id){
        Article article = boardRepository.findById(id).orElseGet(null);

        if(article != null){
            return DetailArticleDto.builder()
                    .title(article.getTitle())
                    .author(article.getAuthor())
                    .content(article.getContent())
                    .createDate(article.getCreateDate())
                    .updateDate(article.getUpdateDate())
                    .images(article.getImgFiles())
                    .build();
        }

        return null;
    }

    @Transactional
    public Long saveArticle(Article article, List<MultipartFile> files) throws IOException {
        if(files!=null)
            fileService.saveArticleImage(article.getId(), files);
        boardRepository.save(article);

        return article.getId();
    }

    @Transactional
    public void deleteArticle(Long articleId){
        boardRepository.deleteById(articleId);
    }
}
