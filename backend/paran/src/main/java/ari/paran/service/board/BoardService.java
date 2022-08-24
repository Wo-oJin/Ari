package ari.paran.service.board;

import ari.paran.domain.board.Article;
import ari.paran.domain.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    public Page<Article> articleList(Pageable pageable){
        return boardRepository.findAll(pageable);
    }

    public Page<Article> articleSearch(Pageable pageable, String keyword){
        return boardRepository.findByTitleContaining(keyword, pageable);
    }
}
