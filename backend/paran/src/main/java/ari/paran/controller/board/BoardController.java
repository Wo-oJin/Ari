package ari.paran.controller.board;

import ari.paran.domain.board.Article;
import ari.paran.dto.response.board.DetailArticleDto;
import ari.paran.dto.response.board.SimpleArticleDto;
import ari.paran.dto.response.board.UpdateForm;
import ari.paran.service.board.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/list")
    @ResponseBody
    public Page<SimpleArticleDto> ArticleList(
            @PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String keyword) throws IOException {

        return boardService.getArticleList(pageable, keyword);
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public DetailArticleDto detailArticle(@PathVariable Long id, Principal principal) throws IOException {
        Long memberId = Long.parseLong(principal.getName());
        return boardService.findArticle(id, memberId);
    }

    /*
    @GetMapping("/write")
    public String returnWritePage(){
        return "boardwrite";
    }

    @GetMapping("/update/{id}")
    public String returnUpdatePage(@PathVariable Long id){
        return "boardupdate";
    }
     */

    @PostMapping("/write") // update로도 쓸 수 있음
    @ResponseBody
    public void ArticleWrite(@RequestBody Article article, List<MultipartFile> files, Principal principal) throws IOException {
        Long memberId = Long.parseLong(principal.getName());

        boardService.saveArticle(article, files, memberId);
    }

    @PostMapping("/update/{id}") // update로도 쓸 수 있음
    @ResponseBody
    public void ArticleUpdate(@PathVariable Long id, @RequestBody Article article, List<MultipartFile> files) throws IOException {
        UpdateForm updateForm = UpdateForm.builder()
                .id(id)
                .title(article.getTitle())
                .content(article.getContent())
                .period(article.getPeriod())
                .updateDate(LocalDate.now())
                .build();

        boardService.updateArticle(updateForm, files);
    }

    @PostMapping("/delete/{id}")
    @ResponseBody
    public void ArticleDelete(@PathVariable Long id){
        boardService.deleteArticle(id);
    }
}
