package ari.paran.controller.board;

import ari.paran.dto.Response;
import ari.paran.dto.response.board.notice.DetailNoticeDto;
import ari.paran.dto.response.board.notice.SimpleNoticeDto;
import ari.paran.service.board.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/notice")
public class NoticeBoardController {
    private final Response response;
    private final NoticeService noticeService;

    @PostMapping
    public ResponseEntity saveNotice(@Validated @RequestBody DetailNoticeDto detailNoticeDto, BindingResult bindingResult){

        if(bindingResult.hasErrors()) {
            System.out.println(bindingResult.getFieldErrors().size());
            return response.fail("정보를 정확히 입력해주세요.", HttpStatus.BAD_REQUEST);
        }

        noticeService.saveNotice(detailNoticeDto);

        return response.success("성공적으로 저장했습니다.");
    }

    @PutMapping("/{noticeId}")
    public ResponseEntity updateNotice(@Validated @RequestBody DetailNoticeDto detailNoticeDto, BindingResult bindingResult,
                                       @PathVariable Long noticeId){
        if(bindingResult.hasErrors())
            return response.fail("정보를 정확히 입력해주세요.", HttpStatus.BAD_REQUEST);

        return noticeService.updateNotice(noticeId, detailNoticeDto);
    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity deleteNotice(@PathVariable Long noticeId){
        return noticeService.deleteNotice(noticeId);
    }

    @GetMapping
    public List<SimpleNoticeDto> getSimpleNoticeBoard(){
        return noticeService.getSimpleNotices();
    }

    @GetMapping("/{noticeId}")
    public DetailNoticeDto getDetailNotice(@PathVariable Long noticeId){
        return noticeService.getDetailNotice(noticeId);
    }

}
