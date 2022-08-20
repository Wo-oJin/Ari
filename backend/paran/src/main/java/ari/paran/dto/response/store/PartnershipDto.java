package ari.paran.dto.response.store;

import ari.paran.domain.Event;
import ari.paran.domain.Partnership;
import ari.paran.service.store.StoreService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class PartnershipDto {

    /*
    private List<Partner> partners = new ArrayList<>();
    private MultiValueMap<String, EventInfo> partners_info = new LinkedMultiValueMap<>();

    public List<Partner> getPartners(List<Partnership> partnershipList){
        for(Partnership partnership : partnershipList){
            String partnerName = partnership.getPartnerName();
            String info = partnership.getInfo();
            LocalDate startDate = partnership.getStart_date();
            LocalDate finishDate = partnership.getFinish_date();

            partners_info.add(partnerName, new EventInfo(info, startDate, finishDate));
        }

        Set<String> keys = partners_info.keySet();
        for(String key : keys){
            Partner partner = new Partner(key, partners_info.get(key));
            partners.add(partner);
        }

        return partners;
    }

    @Getter
    @AllArgsConstructor
    public class EventInfo{
        private String eventInfo;
        private LocalDate startDate;
        private LocalDate finishDate;

    }

    @Getter
    @AllArgsConstructor
    public class Partner{
        private String partnerName;
        private List<EventInfo> infos = new ArrayList<>();
    }
    */

}