package ari.paran.dto.response.partnership;

import ari.paran.domain.store.PartnershipState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class DetailPartnershipDto {

    private Long partnershipId;
    private LocalDate startDate;
    private LocalDate finishDate;
    private List<String> storeNames;
    private String content;
    private PartnershipState partnershipState;
    private boolean sentByMe;

    public DetailPartnershipDto(Long partnershipId, LocalDate startDate, LocalDate finishDate, List<String> storeNames, String content, PartnershipState partnershipState) {
        this.partnershipId = partnershipId;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.storeNames = storeNames;
        this.content = content;
        this.partnershipState = partnershipState;
    }

    public void setSentByMe(boolean sentByMe) {
        this.sentByMe = sentByMe;
    }
}
