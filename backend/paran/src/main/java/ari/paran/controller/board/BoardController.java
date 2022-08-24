package ari.paran.controller.board;

import ari.paran.domain.board.Article;
import ari.paran.dto.response.board.ArticleListDto;
import ari.paran.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/list")
    public ArticleListDto ArticleList(
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
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
}
