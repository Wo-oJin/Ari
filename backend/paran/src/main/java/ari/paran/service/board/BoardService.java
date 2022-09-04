package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.dto.response.board.UpdateForm;
import ari.paran.service.store.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FileService fileService;

    public Page<SimpleArticleDto> getArticleList(Pageable pageable, String keyword) throws IOException{

        Page<Article> board;

        if(keyword == null)
            board = boardRepository.findAll(pageable);
        else
            board = boardRepository.findByTitleContaining(keyword, pageable);

        return board.map(article -> {
            try {
                return SimpleArticleDto.builder()
                                .id(article.getId())
                                .title(article.getTitle())
                                .author(article.getAuthor())
                                .createDate(article.getCreateDate())
                                .image(article.getImgFiles().isEmpty() ? null : fileService.getArticleImage(article, 1).get(0))
                                .build();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public DetailArticleDto findArticle(Long id) throws IOException {
        Article article = boardRepository.findById(id).orElseGet(null);

        if(article != null){
            return DetailArticleDto.builder()
                    .title(article.getTitle())
                    .author(article.getAuthor())
                    .content(article.getContent())
                    .createDate(article.getCreateDate())
                    .updateDate(article.getUpdateDate())
                    .images(fileService.getArticleImage(article, article.getImgFiles().size()))
                    .build();
        }

        return null;
    }

    @Transactional
    public Long saveArticle(Article article, List<MultipartFile> files) throws IOException {

        boardRepository.save(article);

        if(files!=null)
            fileService.saveArticleImage(article.getId(), files);

        return article.getId();
    }

    @Transactional
    public void updateArticle(UpdateForm updateForm, List<MultipartFile> files) throws IOException{

        Article updateArticle = boardRepository.findById(updateForm.getId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글 번호입니다."));

        updateArticle.changeTitle(updateForm.getTitle());
        updateArticle.changeContent(updateForm.getContent());
        updateArticle.changePeriod(updateForm.getPeriod());
        updateArticle.setUpdateDate(LocalDate.now());

        fileService.changeArticleImage(updateForm.getId(), files);
    }

    @Transactional
    public void deleteArticle(Long articleId){
        boardRepository.deleteById(articleId);
    }
}
