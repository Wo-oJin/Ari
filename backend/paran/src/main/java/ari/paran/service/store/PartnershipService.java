package ari.paran.service.store;

import ari.paran.domain.repository.BoardRepository;
import ari.paran.domain.repository.PartnershipRepository;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.PartnershipState;
import ari.paran.domain.store.Store;
import ari.paran.dto.Response;
import ari.paran.dto.request.PartnershipRequestDto;
import ari.paran.dto.response.partnership.DetailPartnershipDto;
import ari.paran.dto.response.partnership.SimplePartnershipDto;
import ari.paran.service.board.BoardService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PartnershipService {

    private final StoreRepository storeRepository;
    private final PartnershipRepository partnershipRepository;
    private final BoardRepository boardRepository;
    private final Response response;

    /**
     * 제휴 요청 메소드
     */
    @Transactional
    public ResponseEntity<?> requestPartnership(PartnershipRequestDto requestDto) {
        /*1. dto를 통해 from/to 가게 모두 가져옴*/
        Store toStore = storeRepository.findById(requestDto.getToStoreId()).orElse(null);
        Store fromStore = storeRepository.findById(requestDto.getFromStoreId()).orElse(null);

        /*2-1. dto의 정보를 기반으로 새로운 제휴 객체 생성1(fromStore)*/
        Partnership newPartnership1 = Partnership.builder()
                .store(fromStore)
                .StoreName(fromStore.getName())
                .partnerId(toStore.getId())
                .partnerName(toStore.getName())
                .startDate(requestDto.getStartDate())
                .finishDate(requestDto.getEndDate())
                .info(requestDto.getContent())
                .partnershipState(PartnershipState.WAITING)
                .article(boardRepository.findById(requestDto.getArticleId()).orElse(null))
                .isFrom(true)
                .build();

        /*2-1. dto의 정보를 기반으로 새로운 제휴 객체 생성1(toStore)*/
        Partnership newPartnership2 = Partnership.builder()
                .store(toStore)
                .StoreName(toStore.getName())
                .partnerId(fromStore.getId())
                .partnerName(fromStore.getName())
                .startDate(requestDto.getStartDate())
                .finishDate(requestDto.getEndDate())
                .info(requestDto.getContent())
                .partnershipState(PartnershipState.WAITING)
                .article(boardRepository.findById(requestDto.getArticleId()).orElse(null))
                .isFrom(false)
                .build();

        /*3. 각 가게의 제휴 리스트에 새로 만든 제휴 객체 추가*/
        toStore.getPartnershipList().add(newPartnership1);
        fromStore.getPartnershipList().add(newPartnership2);

        /*4. 각 객체의 변경사항을 db에 반영*/
        partnershipRepository.save(newPartnership1);
        partnershipRepository.save(newPartnership2);

        newPartnership1.setCounterpartId(newPartnership2.getPartnershipId());
        newPartnership2.setCounterpartId(newPartnership1.getPartnershipId());

        return response.success(null, "새로운 협약 요청", HttpStatus.OK);
    }

    /**
     * 요청 받은 제휴 정보만 가져오기
     */
    @Transactional
    public ResponseEntity<?> getReceivedRequestList(Long storeId) {
        /*1. 해당 api를 요청한 가게 객체를 가져온 뒤 해당 객체의 제휴 리스트를 가져온다.*/
        Store store = storeRepository.findById(storeId).orElse(null);
        List<Partnership> partnershipList = store.getPartnershipList();
        List<SimplePartnershipDto> results = new ArrayList<>(); //여러개의 response dto가 담길 변수
        log.info("제휴 리스트: {}", partnershipList.isEmpty());

        /*2. 각 제휴 정보들을 확인하면서 조건에 부합하는 제휴정보를 dto로 만들어 준 뒤 results에 추가해준다. */
        for (Partnership partnership : partnershipList) {
            log.info("제휴 객체 id: {}", partnership.getPartnershipId());
            /*2-1. 제휴 정보를 확인해보고 해당 api 요청을 보낸 가게가 toStore이고 제휴 상태가 WAITING일 때 */
            if (!partnership.isFrom() && partnership.getPartnershipState() == PartnershipState.WAITING) {
                Store findStore = storeRepository.findById(partnership.getPartnerId()).orElse(null);
                SimplePartnershipDto receivedRequest = new SimplePartnershipDto(partnership.getPartnershipId(),
                        findStore.getName(), partnership.getPartnershipState(), partnership.isRead());

                results.add(receivedRequest);
            }
        }

        return response.success(results, "내가 받은 요청 리스트", HttpStatus.OK);
    }

    /**
     * 요청한 제휴 정보만 가져오기
     */
    @Transactional
    public ResponseEntity<?> getSendRequestList(Long storeId) {

        /*1. 해당 api를 요청한 가게 객체를 가져온 뒤 해당 객체의 제휴 리스트를 가져온다*/
        Store store = storeRepository.findById(storeId).orElse(null);
        List<Partnership> partnershipList = store.getPartnershipList();
        List<SimplePartnershipDto> results = new ArrayList<>();

        for (Partnership partnership : partnershipList) {
            if (partnership.isFrom() && partnership.getPartnershipState() == PartnershipState.WAITING) {
                Store findStore = storeRepository.findById(partnership.getPartnerId()).orElse(null);
                SimplePartnershipDto receivedRequest = new SimplePartnershipDto(partnership.getPartnershipId(),
                        findStore.getName(), partnership.getPartnershipState(), partnership.isRead());

                results.add(receivedRequest);
            }
        }

        return response.success(results, "내가 보낸 요청 리스트", HttpStatus.OK);
    }

    /**
     * 수락/거절 완료된 협약 리스트
     */
    @Transactional
    public ResponseEntity<?> getCompletedList(Long storeId) {

        Store store = storeRepository.findById(storeId).orElse(null);
        List<Partnership> partnershipList = store.getPartnershipList();
        List<SimplePartnershipDto> results = new ArrayList<>();

        /*2. 각 제휴 정보들을 확인하면서 조건에 부합하는 제휴정보를 dto로 만들어 준 뒤 results에 추가해준다. */
        for (Partnership partnership : partnershipList) {
            /*2-1. 제휴 정보를 확인해보고 해당 api 요청을 보낸 가게가 fromStore이고 제휴 상태가 WAITING일 때 */
            if (partnership.getPartnershipState() != PartnershipState.WAITING) {
                Store findStore = storeRepository.findById(partnership.getPartnerId()).orElse(null);
                SimplePartnershipDto receivedRequest = new SimplePartnershipDto(partnership.getPartnershipId(),
                        findStore.getName(), partnership.getPartnershipState());

                results.add(receivedRequest);
            }
        }

        return response.success(results, "처리된 요청 리스트", HttpStatus.OK);
    }

    /**
     * 선택한 제휴의 상세 정보 가져오기
     */
    @Transactional
    public ResponseEntity<?> getPartnershipInfo(Long storeId, Long partnershipId) {

        /*1. 선택한 제휴 객체를 가져온다.*/
        Partnership partnership = partnershipRepository.findById(partnershipId).orElse(null);
        Store fromStore = storeRepository.findById(storeId).orElse(null);
        Store toStore = storeRepository.findById(partnership.getPartnerId()).orElse(null);

        /*2. 해당 객체를 detailPartnershipDto로 만들어준다.*/
        List<String> storeNames = new ArrayList<>();
        storeNames.add(fromStore.getName());
        storeNames.add(toStore.getName());
        DetailPartnershipDto detailPartnershipDto = new DetailPartnershipDto(partnershipId, partnership.getStartDate(),
                partnership.getFinishDate(), storeNames, partnership.getInfo(), partnership.getPartnershipState());

        /*3. 자신이 보낸 요청을 자신이 조회할 때에는 페이지가 다르게 렌더링 되어야 하므로 이를 구분해준다*/
        if (partnership.isFrom()) { // 자신이 보낸 요청인 경우
            detailPartnershipDto.setSentByMe(true);
        }else{
            detailPartnershipDto.setSentByMe(false);
            /*3-1. 만약 받은 요청을 클릭 했을 때 해당 요청을 처음 클릭하는 경우에는 isRead를 false로 변경하여 읽음 처리*/
            if(partnership.isRead() == false)
                partnership.changeReadStatus();
        }

        /*4. DB에 변경사항 반영*/
        partnershipRepository.save(partnership);

        return response.success(detailPartnershipDto, "제휴 요청 정보", HttpStatus.OK);
    }

    /**
     * 제휴 요청을 승인했을 때
     */
    @Transactional
    public ResponseEntity<?> approvePartnership(Long storeId, Long partnershipId) {
        Partnership partnership = partnershipRepository.findById(partnershipId).orElse(null);
        Partnership counterpart = partnershipRepository.findById(partnership.getCounterpartId()).orElse(null);

        partnership.changePartnershipState(PartnershipState.APPROVED);
        counterpart.changePartnershipState(PartnershipState.APPROVED);

        partnership.getArticle().setCompleted(true);

        partnershipRepository.save(partnership);
        partnershipRepository.save(counterpart);

        return response.success();
    }

    /**
     * 제휴 요청을 거절했을 때
     */
    @Transactional
    public ResponseEntity<?> rejectPartnership(Long storeId, Long partnershipId) {
        Partnership partnership = partnershipRepository.findById(partnershipId).orElse(null);
        Partnership counterpart = partnershipRepository.findById(partnership.getCounterpartId()).orElse(null);

        partnership.changePartnershipState(PartnershipState.REJECTED);
        counterpart.changePartnershipState(PartnershipState.REJECTED);

        partnershipRepository.save(partnership);
        partnershipRepository.save(counterpart);

        return response.success();
    }

}
