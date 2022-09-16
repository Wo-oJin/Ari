package ari.paran.service;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.BoardRepository;
import ari.paran.service.board.BoardService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BoardServiceTest {

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    BoardService boardService;

    @Test
    public void articleSave() throws IOException {
        Article article = Article.builder()
                .title("title1")
                .content("content1")
                .member(null)
                .createDate(LocalDate.now())
                .updateDate(LocalDate.now())
                .build();

        Long id = boardService.saveArticle(article, null);

        Article findArticle = boardService.findArticle(id);

        Assertions.assertThat(article).isEqualTo(findArticle);
    }

    @Test
    public void articleUpdate() throws IOException {
        Article article = Article.builder()
                .title("title1")
                .content("content1")
                .member(null)
                .createDate(LocalDate.now())
                .updateDate(LocalDate.now())
                .build();

        Long id = boardService.saveArticle(article, null);

        article.changeTitle("title2");
        id = boardService.saveArticle(article, null);

        Article findArticle = boardService.findArticle(id);

        Assertions.assertThat(article.getTitle()).isEqualTo("title2");
    }
}
