package ari.paran.service.board;

import ari.paran.domain.board.Notice;
import ari.paran.domain.repository.notice.NoticeRepository;
import ari.paran.dto.Response;
import ari.paran.dto.response.board.notice.DetailNoticeDto;
import ari.paran.dto.response.board.notice.SimpleNoticeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final Response response;

    public List<SimpleNoticeDto> getSimpleNotices(){

        return noticeRepository.findAll().stream()
                .map(notice -> new SimpleNoticeDto(notice.getTitle(), notice.getCreateDate()))
                .collect(Collectors.toList());
    }

    public DetailNoticeDto getDetailNotice(Long noticeId){

        return noticeRepository.findById(noticeId)
                .map(notice -> new DetailNoticeDto(notice.getTitle(), notice.getContent(), notice.getCreateDate()))
                .orElse(null);
    }

    @Transactional
    public Long saveNotice(DetailNoticeDto detailNoticeDto){
        Notice notice = noticeRepository.save(detailNoticeDto.toNotice());

        return notice.getId();
    }

    @Transactional
    public ResponseEntity updateNotice(Long noticeId, DetailNoticeDto detailNoticeDto){
        Optional<Notice> notice = noticeRepository.findById(noticeId);

        if(notice.isPresent()){
            Notice findNotice = notice.get();

            findNotice.changeTitle(detailNoticeDto.getTitle());
            findNotice.changeContent(detailNoticeDto.getContent());

            noticeRepository.save(findNotice);

            return response.success("성공적으로 수정했습니다.");
        }
        else{
            return response.fail("존재하지 않는 게시글입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity deleteNotice(Long noticeId){

        noticeRepository.deleteById(noticeId);

        return response.success("성공적으로 삭제했습니다.");
    }

}
