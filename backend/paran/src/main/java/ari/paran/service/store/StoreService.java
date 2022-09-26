package ari.paran.service.store;
import ari.paran.domain.Event;
import ari.paran.domain.repository.*;
import ari.paran.domain.store.Address;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.store.Store;
import ari.paran.domain.store.StoreImgFile;
import ari.paran.dto.Response;
import ari.paran.dto.EditInfoDto;
import ari.paran.dto.response.store.EventListDto;
import ari.paran.dto.response.store.SimpleStoreDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public void save(Store store){
        storeRepository.save(store);
    }

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
        List<Store> stores = memberRepository.findById(ownerId).get().getStores();
        log.info("stores 정보: {}", stores.isEmpty());
        List<EditInfoDto> existingInfos = new ArrayList<>();

        for (Store store : stores) {
            List<String> existingImages = fileService.loadImage(store);
            log.info("store 정보: {}", store.getName());
            EditInfoDto existingInfo = new EditInfoDto(store.getId(), store.getName(), store.getAddress().getRoadAddress(), store.getAddress().getDetailAddress(),
                    store.getOwnerName(), store.getPhoneNumber(), existingImages, store.getSubText(), store.getOpenTime());

            existingInfos.add(existingInfo);
        }


        return response.success(existingInfos, "기존 가게정보", HttpStatus.OK);

    }

    @Transactional
    public ResponseEntity<?> editInfo(EditInfoDto editInfoDto,
                                      List<MultipartFile> images,
                                      Principal principal) throws IOException {
        //1. 우선 해당 가게의 기존 이미지 파일을 모두 삭제
        //Long ownerId = Long.valueOf(principal.getName());
        Store store = storeRepository.findById(editInfoDto.getStoreId()).get();
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
        fileService.saveStoreImage(store.getId(), images);

        storeRepository.save(store);

        return response.success();
    }

    public ResponseEntity<?> existingEvent(Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        List<Store> stores = memberRepository.findById(ownerId).get().getStores();
        List<EventListDto> result = new ArrayList<>();

        for (Store store : stores) {
            List<Event> eventList = store.getEventList();
            List<String> eventInfo = new ArrayList<>();

            for (Event event : eventList) {
                eventInfo.add(event.getInfo());
            }

            EventListDto eventListDto = new EventListDto(store.getId(), store.getName(), eventInfo);
            result.add(eventListDto);
        }

        return response.success(result, "기존 이벤트 정보", HttpStatus.OK);
    }

    public ResponseEntity<?> editEvent(Long storeId, int eventNum, String newInfo, Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = storeRepository.findById(storeId).get();
        Event event = store.getEventList().get(eventNum);
        event.changeInfo(newInfo);

        eventRepository.save(event);

        return response.success();
    }

    public ResponseEntity<?> addEvent(Long storeId, String info, Principal principal) {
        Store store = storeRepository.findById(storeId).get();

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

    public ResponseEntity<?> deleteEvent(Long storeId, int eventNum, Principal principal) {
        Long ownerId = Long.valueOf(principal.getName());
        Store store = storeRepository.findById(storeId).get();
        Event event = store.getEventList().get(eventNum);

        store.getEventList().remove(event);
        log.info("이벤트 갯수 표시: {}", store.getEventList().size());
        if (store.getEventList().size() == 0) {
            store.changeEventStatus(false);
        }
        storeRepository.save(store);

        eventRepository.delete(event);

        return response.success(null, "성공적으로 삭제되었습니다", HttpStatus.OK);
    }

    public ResponseEntity<?> addStore(EditInfoDto editInfoDto,
                                      List<MultipartFile> images,
                                      Principal principal) throws IOException {
        Long ownerId = Long.valueOf(principal.getName());
        Store newStore = new Store();
        newStore.setMember(memberRepository.findById(ownerId).get());
        storeRepository.save(newStore);
        editInfoDto.setStoreId(newStore.getId());

        return editInfo(editInfoDto, images, principal);
    }


    /* toy */

    public Store findByName(String storeName) {
        return storeRepository.findByName(storeName).orElse(null);
    }

    public List<SimpleStoreDto> findByCategory(String code) throws IOException {
        List<SimpleStoreDto> simpleStoreDtoList = new ArrayList<>();
        List<Store> stores =  storeRepository.findByCategory(code);

        for(Store store : stores){

            Map<String, String> eventMap = store.getRandomEvents(); // key = eventInfo, value = eventDate
            List<String> eventInfos = new ArrayList<>(eventMap.keySet());

            int randomId = (int)(Math.random() * eventMap.size());

            SimpleStoreDto simpleStoreDto = SimpleStoreDto.builder()
                    .storeId(store.getId())
                    .storeName(store.getName())
                    .storeImage(fileService.getMainStoreImage(store))
                    .eventContent(eventInfos.get(randomId))
                    .eventPeriod(eventMap.get(eventInfos.get(randomId)))
                    .eventLength(eventMap.size())
                    .build();

            simpleStoreDtoList.add(simpleStoreDto);
        }

        return simpleStoreDtoList;
    }

    public List<Store> findStoreByKeyword(String keyword) {
        return storeRepository.findByKeyword(keyword);
    }
}
