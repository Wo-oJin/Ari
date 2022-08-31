package ari.paran.controller.board;

import ari.paran.domain.board.Article;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.service.board.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<SimpleArticleDto> ArticleList(
            @PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String keyword){

        return boardService.getArticleList(pageable, keyword);
    }

    @GetMapping("/list/{id}")
    public DetailArticleDto detailArticle(@PathVariable Long id){
        return boardService.findArticle(id);
    }

    @PostMapping({"/write", "/update"}) // update로도 쓸 수 있음
    public void ArticleWrite(@ModelAttribute Article article, List<MultipartFile> files) throws IOException {
        boardService.saveArticle(article, files);
    }

    @PostMapping("/delete/{id}")
    public void ArticleDelete(@PathVariable Long id){
        boardService.deleteArticle(id);
    }
}
