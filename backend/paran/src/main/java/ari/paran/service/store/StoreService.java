package ari.paran.service.store;

import ari.paran.domain.Event;
import ari.paran.domain.repository.*;
import ari.paran.domain.store.Address;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Store;
import ari.paran.domain.store.StoreImgFile;
import ari.paran.dto.Response;
import ari.paran.dto.EditInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final MemberRepository memberRepository;
    private final PartnershipRepository partnershipRepository;
    private final StoreImgFileRepository storeImgFileRepository;
    private final EventRepository eventRepository;
    private final Response response;
    private final FileService fileService;

    public List<Store> findStores(){
        return storeRepository.findAll();
    }

    public Store findStore(Long store_id){
        return storeRepository.findById(store_id).orElseGet(null);
    }

    public List<String> getPartnersName(String storeName){

        List<Partnership> partnershipList = partnershipRepository.selectByStoreName(storeName);

        return partnershipList.stream()
                .map(Partnership :: getPartnerName)
                .distinct()
                .collect(Collectors.toList());
    }

    public ResponseEntity<?> existingInfo(Principal principal) throws IOException {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
        List<String> existingImages = fileService.loadImage(store);


        EditInfoDto existingInfo = new EditInfoDto(store.getName(), store.getAddress().getRoadAddress(), store.getAddress().getDetailAddress(),
                store.getOwnerName(), store.getPhoneNumber(), existingImages, store.getSubText(), store.getOpenTime());

        return response.success(existingInfo, "기존 가게정보", HttpStatus.OK);

    }

    @Transactional
    public ResponseEntity<?> editInfo(EditInfoDto editInfoDto, Principal principal) throws IOException {
        //1. 우선 해당 가게의 기존 이미지 파일을 모두 삭제
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
        //1-1. 이미지 파일을 삭제. 파일 경로 정해야 함
        for (StoreImgFile imgFile : store.getStoreImgFiles()) {
            File file = new File(imgFile.getFileUrl() + imgFile.getFilename());
            if (file.exists()) {
                file.delete();
                storeImgFileRepository.delete(imgFile);
            }
        }
        store.getStoreImgFiles().clear();

        //2. 이미지를 제외하고 새 가게 정보로 변경
        store.updateInfo(editInfoDto.getStoreName(), new Address(editInfoDto.getRoadAddress(), editInfoDto.getDetailAddress()),
                editInfoDto.getOwnerName(), editInfoDto.getPhoneNumber(), editInfoDto.getSubText(), editInfoDto.getOpenHour());

        //3. 이미지 새로 저장
        fileService.saveImage(store.getId(), editInfoDto.getNewImages());

        storeRepository.save(store);

        return response.success();
    }

    public ResponseEntity<?> existingEvent(Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
        List<String> eventInfo = new ArrayList<>();

        List<Event> eventList = store.getEventList();
        for (Event event : eventList) {
            eventInfo.add(event.getInfo());
        }
        return response.success(eventInfo, "기존 이벤트 정보", HttpStatus.OK);
    }

    public ResponseEntity<?> editEvent(int eventNum, String newInfo, Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
        Event event = store.getEventList().get(eventNum);
        event.changeInfo(newInfo);

        eventRepository.save(event);

        return response.success();
    }

    public ResponseEntity<?> addEvent(String info, Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);

        Event newEvent = Event.builder().store(store).info(info).build();
        eventRepository.save(newEvent);

        log.info("이벤트 갯수 표시: {}", store.getEventList().size());
        if (store.getEventList().size() == 1) {
            store.changeEventStatus(true);
        }
        store.getEventList().add(newEvent);
        storeRepository.save(store);

        return response.success("", "성공적으로 이벤트가 추가되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteEvent(int eventNum, Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
        Event event = store.getEventList().get(eventNum);

        store.getEventList().remove(event);
        log.info("이벤트 갯수 표시: {}", store.getEventList().size());
        if (store.getEventList().size() == 0) {
            store.changeEventStatus(false);
        }
        storeRepository.save(store);

        eventRepository.delete(event);

        return response.success();
    }
}
