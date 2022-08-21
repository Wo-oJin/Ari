package ari.paran.domain;

import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

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

    private String info; // 제휴 정보

    private LocalDate start_date;

    private LocalDate finish_date;

}
