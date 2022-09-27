package ari.paran.dto.response.partnership;

import ari.paran.domain.store.PartnershipState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class SimplePartnershipDto {

    private Long partnershipId;
    private String StoreName;
    private PartnershipState partnershipState;
    private boolean isRead;

    public SimplePartnershipDto(Long partnershipId, String fromStoreName) {
        this.partnershipId = partnershipId;
        this.StoreName = fromStoreName;
    }

    public SimplePartnershipDto(Long partnershipId, String fromStoreName, PartnershipState partnershipState) {
        this.partnershipId = partnershipId;
        this.StoreName = fromStoreName;
        this.partnershipState = partnershipState;
    }
}
