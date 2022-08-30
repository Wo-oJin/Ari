package ari.paran.controller.board;

import ari.paran.domain.board.Article;
import ari.paran.dto.response.board.ArticleListDto;
import ari.paran.service.board.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/list")
    public ArticleListDto ArticleList(
            @PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String keyword){

        Page<Article> board;

        if(keyword == null)
            board = boardService.articleList(pageable);
        else
            board = boardService.articleSearch(pageable, keyword);

        int now = pageable.getPageNumber();
        int start = (now / 5) * 5 + 1;
        int end = (now / 5) * 5 + 5;

        return ArticleListDto.builder()
                .articleList(board)
                .now(now)
                .start(start)
                .end(end)
                .build();
    }

    @PostMapping({"/write", "/update"}) // update로도 쓸 수 있음
    public void ArticleWrite(@ModelAttribute Article article, List<MultipartFile> files) throws IOException {
        boardService.articleSave(article, files);
    }

    @PostMapping("/delete/{id}")
    public void ArticleDelete(@PathVariable Long id){
        boardService.articleDelete(id);
    }
}
