package ari.paran.service.store;
import ari.paran.domain.Event;
import ari.paran.domain.member.Member;
import ari.paran.domain.repository.*;
import ari.paran.domain.store.*;
import ari.paran.dto.Response;
import ari.paran.dto.response.store.EditInfoDto;
import ari.paran.dto.response.store.DetailStoreDto;
import ari.paran.dto.response.store.EventListDto;
import ari.paran.dto.response.store.SimpleStoreDto;
import ari.paran.dto.response.store.StoreNameDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final MemberRepository memberRepository;
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

    public List<String> getPartnersName(Store store){

        List<Partnership> partnershipList = store.getPartnershipList();
        List<String> results = new ArrayList<>();

        for (Partnership partnership : partnershipList) {
            if(!partnership.isFrom())
                results.add(partnership.getPartnerName());
        }

        return results.stream()
                .distinct()
                .collect(Collectors.toList());
    }

    /***************************************************************
     * 가게 상세 정보를 조회할 때, 해당 가게가 어떤 가게들과 협약을 맺고 있는지 반환하는 메서드
     ***************************************************************/
    public List<DetailStoreDto.Partner> getPartners(List<Partnership> partnershipList){

        List<DetailStoreDto.Partner> partners = new ArrayList<>();
        Map<String, String> partnerLocations = new HashMap<>();
        MultiValueMap<String, DetailStoreDto.EventInfo> partnersInfo = new LinkedMultiValueMap<>();

        for(Partnership partnership : partnershipList){
            String partnerName = partnership.getPartnerName();
            partnerLocations.put(partnerName, findStore(partnership.getPartnerId()).getAddress().getRoadAddress());
            String info = partnership.getInfo();
            LocalDate startDate = partnership.getStartDate();
            LocalDate finishDate = partnership.getFinishDate();

            partnersInfo.add(partnerName, new DetailStoreDto.EventInfo(info, startDate, finishDate));
        }

        Set<String> keys = partnersInfo.keySet();
        for(String key : keys){
            DetailStoreDto.Partner partner = new DetailStoreDto.Partner(key, partnerLocations.get(key), partnersInfo.get(key));
            partners.add(partner);
        }

        return partners;
    }

    /**
     * 현재 자신의 가게들 정보를 반환함
     */
    public ResponseEntity<?> existingInfo(Principal principal) throws IOException {
        /*1. 요청보낸 회원의 id를 통해 회원의 Store 리스트를 가져온다.*/
        Long ownerId = Long.valueOf(principal.getName());
        List<Store> stores = memberRepository.findById(ownerId).get().getStores();
        log.info("stores 정보: {}", stores.isEmpty());

        /*2. 현재 가게들의 정보가 저장될 dto의 리스트를 선언한다*/
        List<EditInfoDto> existingInfos = new ArrayList<>();

        /*3. 반복문을 통해 EditInfoDto를 만들고 이를 existingInfos에 추가한다.*/
        for (Store store : stores) {
            List<String> existingImages = fileService.getStoreImages(store);
            log.info("store 정보: {}", store.getName());
            EditInfoDto existingInfo = new EditInfoDto(store.getId(), store.getName(), store.getAddress().getRoadAddress(), store.getAddress().getDetailAddress(),
                    store.getOwnerName(), store.getPhoneNumber(), store.getStorePhoneNumber(), existingImages, store.getSubText(), store.getOpenTime());

            existingInfos.add(existingInfo);
        }
        return response.success(existingInfos, "기존 가게정보", HttpStatus.OK);

    }

    /**
     * editInfo와 images로 기존 정보를 변경
     */
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
        fileService.saveStoreImage(store, images);

        storeRepository.save(store);

        return response.success();
    }

    /**
     * 기존 이벤트 정보 가져오기
     */
    public ResponseEntity<?> existingEvent(Principal principal) {
        /*1. 요청보낸 회원의 id를 통해 회원의 Store 리스트를 가져온다.*/
        Long ownerId = Long.valueOf(principal.getName());
        List<Store> stores = memberRepository.findById(ownerId).get().getStores();
        List<EventListDto> result = new ArrayList<>(); // 반환에 사용될 EventListDto 리스트 변수

        /*2. 바깥 반복문에서는 이벤트 내용이 담긴 eventListDto를 result에 추가해준다. */
        for (Store store : stores) {
            List<Event> eventList = store.getEventList();
            List<String> eventInfo = new ArrayList<>(); // 한 가게의 이벤트 내용들이 담길 변수

            /*3. 안쪽 반복문에서는 한 가게의 이벤트 정보들을 eventInfo에 담아준다.*/
            for (Event event : eventList) {
                eventInfo.add(event.getInfo());
            }

            EventListDto eventListDto = new EventListDto(store.getId(), store.getName(), eventInfo);
            result.add(eventListDto);
        }

        return response.success(result, "기존 이벤트 정보", HttpStatus.OK);
    }

    public ResponseEntity<?> editEvent(Long storeId, int eventNum, String newInfo) {
        Store store = storeRepository.findById(storeId).get();
        Event event = store.getEventList().get(eventNum);
        event.changeInfo(newInfo);

        eventRepository.save(event);

        return response.success();
    }

    /**
     * 자체 이벤트를 추가
     */
    public ResponseEntity<?> addEvent(Long storeId, String info, Principal principal) {
        /*1. 매개변수 storeId를 이용하여 이벤트를 추가할 가게를 찾는다.*/
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

    public ResponseEntity<?> getStoreNameList(Long ownerId) {
    /* toy */
        Member owner = memberRepository.findById(ownerId).orElse(null);
        List<Store> Stores = owner.getStores();
        List<StoreNameDto> results = new ArrayList<>();

        for (Store store : Stores) {
            StoreNameDto storeNameDto = new StoreNameDto(store.getId(), store.getName());
            results.add(storeNameDto);
        }

        return response.success(results, "발신자 가게 정보", HttpStatus.OK);
    }

    public List<SimpleStoreDto> findByCategory(String code) throws IOException {
        List<Store> stores = null;

        if(code.equals("전체"))
            stores = storeRepository.findAll();
        else
            stores = storeRepository.findByCategory(Category.fromString(code));

        Collections.sort(stores, (s1, s2) -> s1.getName().compareTo(s2.getName()));
        return getStoreRandomEvents(stores);
    }

    public List<SimpleStoreDto> findStoreByKeyword(String keyword) throws IOException {
        List<Store> stores = storeRepository.findStoreByKeyword(keyword);

        Collections.sort(stores, (s1, s2) -> s1.getName().compareTo(s2.getName()));
        return getStoreRandomEvents(stores);
    }

    public List<SimpleStoreDto> findRandomEvents() throws IOException {
        List<Store> stores = storeRepository.findAllStoreEvents();

        if(stores.size() > 5){
            while(stores.size() > 5) {
                int randomId = (int)(Math.random() * stores.size());
                stores.remove(randomId);
            }
        }

        Collections.shuffle(stores);
        return getStoreRandomEvents(stores);
    }

    private List<SimpleStoreDto> getStoreRandomEvents(List<Store> stores) throws IOException {
        List<SimpleStoreDto> simpleStoreDtoList = new ArrayList<>();

        for(Store store : stores){
            Map<String, String> eventMap = store.getRandomEvents(); // key = eventInfo, value = eventDate

            if(eventMap.size() == 0)
                continue;

            List<String> eventInfos = new ArrayList<>(eventMap.keySet());

            int randomId = (int)(Math.random() * eventMap.size());
            String eventPeriod = eventMap.get(eventInfos.get(randomId));

            SimpleStoreDto simpleStoreDto = SimpleStoreDto.builder()
                    .storeId(store.getId())
                    .storeName(store.getName())
                    .storeImage(fileService.getMainStoreImage(store))
                    .eventContent(eventInfos.get(randomId))
                    .eventPeriod(eventPeriod == null ? "" : eventPeriod)
                    .eventLength(eventMap.size())
                    .build();

            simpleStoreDtoList.add(simpleStoreDto);
        }

        return simpleStoreDtoList;
    }

    public Store findStoreIdByNameAndMember(String storeName, Long memberId){
        Member member = memberRepository.findById(memberId).orElse(null);

        return storeRepository.findStoreByNameAndMember(storeName, member);
    }
}
