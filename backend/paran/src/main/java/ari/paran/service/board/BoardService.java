package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.board.FavoriteArticle;
import ari.paran.domain.member.Member;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.domain.repository.FavoriteArticleRepository;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.domain.store.FavoriteStore;
import ari.paran.domain.store.Store;
import ari.paran.dto.Response;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.LikeArticleListDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.dto.response.board.UpdateForm;
import ari.paran.dto.response.store.LikeStoreListDto;
import ari.paran.service.auth.MemberService;
import ari.paran.service.store.FileService;
import ari.paran.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final FavoriteArticleRepository favoriteArticleRepository;
    private final MemberRepository memberRepository;
    private final StoreService storeService;
    private final FileService fileService;
    private final MemberService memberService;
    private final Response response;

    public Article findArticle(Long articleId){
        return boardRepository.findById(articleId).orElse(null);
    }

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
                                .isCompleted(article.isCompleted())
                                .image(fileService.getArticleImages(article, 1).get(0))
                                .build();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public DetailArticleDto findArticle(Long articleId, Long memberId) throws IOException {
        Article article = boardRepository.findById(articleId).orElseGet(null);
        Store store = storeService.findStoreIdByNameAndMember(article.getAuthor(), article.getMember().getId());

        if(article != null){
            return DetailArticleDto.builder()
                    .storeId(store.getId())
                    .title(article.getTitle())
                    .content(article.getContent())
                    .articleId(article.getId())
                    .author(article.getAuthor())
                    .period(article.getPeriod())
                    .favorite(memberService.getMemberInfoById(memberId).isFavoriteArticle(article))
                    .authority(article.getMember().getId() == memberId ? true : false)
                    .location(store.getFullAddress())
                    .createDate(article.getCreateDate())
                    .images(fileService.getArticleImages(article, article.getImgFiles().size()))
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

    public ResponseEntity<?> likeArticleList(Long memberId) throws IOException {
        Member member = memberRepository.findById(memberId).orElse(null);
        List<FavoriteArticle> favorites = member.getFavoriteArticles();
        List<LikeArticleListDto> data = new ArrayList<>();
        for (FavoriteArticle favorite : favorites) {
            Article article = favorite.getArticle();
            data.add(LikeArticleListDto.builder()
                    .name(article.getTitle())
                    .articleId(article.getId())
                    .updateDate(article.getUpdateDate())
                    .image(fileService.getMainArticleImage(article))
                    .isCompleted(article.isCompleted())
                    .build());
        }
        log.info("좋아요 게시글 개수: {}", data.size());

        return response.success(data, "좋아요 게시글 목록", HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> toggleFavoriteArticle(Long articleId, Long memberId) {
        Member member = memberService.getMemberInfoById(memberId);
        Article article = findArticle(articleId);

        FavoriteArticle favorite;

        if(member.isFavoriteArticle(article)) {
            favorite = favoriteArticleRepository.findFavoriteArticleByMemberAndArticle(member, article).orElseGet(null);

            member.deleteFavoriteArticle(favorite);
            favoriteArticleRepository.delete(favorite);

            return response.success("좋아요 목록에서 성공적으로 제거했습니다.");
        }

        favorite = new FavoriteArticle(member, article);

        member.addFavoriteArticle(favorite);
        article.addFavorite(favorite);

        favoriteArticleRepository.save(favorite);

        return response.success("좋아요 목록에 성공적으로 저장했습니다.");
    }
}
