package ari.paran.domain;

import ari.paran.domain.store.Store;
import ari.paran.dto.response.store.PartnershipDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import net.bytebuddy.asm.Advice;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Data
@Entity
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partnership_id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "from_store_id")
    private Store store;

    @Column(name = "to_store_name")
    private String partnerName;

    // transient -> db에 저장 안함
    private transient String partnerLocation;

    private String info;

    private LocalDate start_date;

    private LocalDate finish_date;

}
