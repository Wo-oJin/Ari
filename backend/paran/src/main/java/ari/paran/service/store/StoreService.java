package ari.paran.service.store;

import ari.paran.domain.member.Member;
import ari.paran.domain.store.Partnership;
import ari.paran.domain.repository.StoreImgFileRepository;
import ari.paran.domain.repository.MemberRepository;
import ari.paran.domain.repository.PartnershipRepository;
import ari.paran.domain.repository.StoreRepository;
import ari.paran.domain.store.Store;
import ari.paran.dto.Response;
import ari.paran.dto.response.store.DetailStoreDto;
import ari.paran.service.auth.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final MemberRepository memberRepository;
    private final PartnershipRepository partnershipRepository;
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
        Member member = memberRepository.findById(Long.valueOf(principal.getName())).orElse(null);
        Store store = member.getStores().get(0);

        DetailStoreDto detailStoreDto = new DetailStoreDto(store);
        detailStoreDto.setStoreImages(fileService.getImage(store));
        detailStoreDto.setFavorite(member.favoriteStore(store));

        return response.success(detailStoreDto, "기존 가게정보", HttpStatus.OK);
    }

//    @Transactional
//    public ResponseEntity<?> editInfo(DetailStoreDto.DetailStore newInfo, Principal principal) {
//        //1. 우선 해당 가게의 기존 이미지 파일을 모두 삭제
//        Long ownerId = Long.valueOf(principal.getName());
//        Store store = memberRepository.findById(ownerId).get().getStores().get(0);
//        //1-1. 이미지 파일을 삭제. 파일 경로 정해야 함
//        for (ImgFile imgFile : store.getImgFile()) {
//            File file = new File(imgFile.getFileUrl() + imgFile.getFileName());
//            if (file.exists()) {
//                file.delete();
//            }
//        }
//        store.getImgFile().clear();
//
//        //2. 새 가게 정보로 변경
//        store.setName(newInfo.getName());
//        store.setAddress(newInfo.getAddress());
//        store.setOwnerName(newInfo.getOwnerName());
//        store.setPhoneNumber(newInfo.getPhoneNumber());
//        store.setSubText(newInfo.getSubText());
//        store.setOpenTime(newInfo.getOpenHour());
//
//
//    }
}
