package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.domain.store.Store;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.dto.response.board.UpdateForm;
import ari.paran.service.auth.MemberService;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final FileService fileService;
    private final MemberService memberService;

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
                                .author(article.getMember().getStores().get(0).getName())
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
                    .content(article.getContent())
                    .author(article.getMember().getStores().get(0).getName())
                    .period(article.getPeriod())
                    .createDate(article.getCreateDate())
                    .updateDate(article.getUpdateDate())
                    .images(fileService.getArticleImage(article, article.getImgFiles().size()))
                    .build();
        }

        return null;
    }

    @Transactional
    public void saveArticle(Article article, List<MultipartFile> files, Long authorId) throws IOException {

        //String storeName = memberService.getMemberInfoById(authorId).getStores().get(0).getName();
        article.setMember(memberService.getMemberInfoById(authorId));
        article.setCreateDate(LocalDate.now());
        boardRepository.save(article);

        if(files!=null)
            fileService.saveArticleImage(article.getId(), files);

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